-- Production booking engine: atomic seat control, reservation lifecycle,
-- secure voucher tokens and auditable state changes.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE public.reservations
  ADD COLUMN IF NOT EXISTS passenger_count INT NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS lead_passenger_name TEXT,
  ADD COLUMN IF NOT EXISTS lead_passenger_document TEXT,
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.reservations DROP CONSTRAINT IF EXISTS reservations_passenger_count_check;
ALTER TABLE public.reservations ADD CONSTRAINT reservations_passenger_count_check CHECK (passenger_count > 0);
ALTER TABLE public.availability DROP CONSTRAINT IF EXISTS availability_seats_check;
ALTER TABLE public.availability ADD CONSTRAINT availability_seats_check CHECK (total_seats >= 0 AND available_seats >= 0 AND available_seats <= total_seats);

DROP POLICY IF EXISTS "vouchers_select_role_scoped" ON public.vouchers;
CREATE POLICY "vouchers_select_role_scoped"
ON public.vouchers FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reservations r
    WHERE r.id = vouchers.reservation_id
      AND (
        public.current_user_role() = 'admin'
        OR public.current_user_role() = 'operator'
        OR r.user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.agencies_users au
          WHERE au.agency_id = r.agency_id AND au.user_id = auth.uid()
        )
      )
  )
);

DROP POLICY IF EXISTS "vouchers_insert_admin" ON public.vouchers;
CREATE POLICY "vouchers_insert_admin"
ON public.vouchers FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() = 'admin');
DROP POLICY IF EXISTS "vouchers_update_admin" ON public.vouchers;
CREATE POLICY "vouchers_update_admin"
ON public.vouchers FOR UPDATE TO authenticated
USING (public.current_user_role() = 'admin')
WITH CHECK (public.current_user_role() = 'admin');
DROP POLICY IF EXISTS "vouchers_delete_admin" ON public.vouchers;
CREATE POLICY "vouchers_delete_admin"
ON public.vouchers FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

DROP POLICY IF EXISTS "audit_logs_select_admin" ON public.audit_logs;
CREATE POLICY "audit_logs_select_admin"
ON public.audit_logs FOR SELECT TO authenticated
USING (public.current_user_role() = 'admin');

-- Public verification is deliberately limited to a safe function response.
CREATE OR REPLACE FUNCTION public.verify_voucher(p_token TEXT)
RETURNS TABLE (
  valid BOOLEAN,
  reservation_id UUID,
  voucher_id UUID,
  lead_passenger_name TEXT,
  passenger_count INT,
  vessel_name TEXT,
  route_name TEXT,
  departure_date DATE,
  departure_time TIME,
  reservation_status TEXT,
  agency_name TEXT,
  issued_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT TRUE, r.id, v.id, r.lead_passenger_name, r.passenger_count,
    ve.name, ro.name, a.date, a.departure_time, r.status, ag.name, v.issued_at
  FROM public.vouchers v
  JOIN public.reservations r ON r.id = v.reservation_id
  JOIN public.availability a ON a.id = r.availability_id
  LEFT JOIN public.vessels ve ON ve.id = a.vessel_id
  LEFT JOIN public.routes ro ON ro.id = a.route_id
  LEFT JOIN public.agencies ag ON ag.id = r.agency_id
  WHERE v.qr_code_token = p_token AND r.status <> 'cancelled'
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.verify_voucher(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_voucher(TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.create_reservation(
  p_availability_id UUID,
  p_agency_id UUID,
  p_passenger_count INT,
  p_lead_passenger_name TEXT,
  p_lead_passenger_document TEXT
)
RETURNS TABLE (reservation_id UUID, voucher_token TEXT, available_seats INT, total_price NUMERIC, commission_amount NUMERIC)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user UUID := auth.uid(); v_role TEXT; v_availability public.availability%ROWTYPE;
  v_tour_price NUMERIC(10,2); v_total NUMERIC(10,2); v_commission NUMERIC(10,2);
  v_reservation UUID; v_token TEXT;
BEGIN
  IF v_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  IF p_passenger_count IS NULL OR p_passenger_count < 1 THEN RAISE EXCEPTION 'INVALID_PASSENGER_COUNT'; END IF;
  IF p_lead_passenger_name IS NULL OR length(trim(p_lead_passenger_name)) < 2 THEN RAISE EXCEPTION 'INVALID_LEAD_PASSENGER'; END IF;
  SELECT public.current_user_role() INTO v_role;
  IF v_role NOT IN ('admin', 'agency') THEN RAISE EXCEPTION 'ROLE_NOT_ALLOWED'; END IF;
  IF v_role = 'agency' AND NOT EXISTS (SELECT 1 FROM public.agencies_users au WHERE au.agency_id = p_agency_id AND au.user_id = v_user) THEN RAISE EXCEPTION 'AGENCY_NOT_ALLOWED'; END IF;
  SELECT * INTO v_availability FROM public.availability WHERE id = p_availability_id FOR UPDATE;
  IF NOT FOUND OR v_availability.status <> 'active' THEN RAISE EXCEPTION 'AVAILABILITY_NOT_FOUND'; END IF;
  IF v_availability.date < CURRENT_DATE THEN RAISE EXCEPTION 'DATE_IN_PAST'; END IF;
  IF v_availability.available_seats < p_passenger_count THEN RAISE EXCEPTION 'INSUFFICIENT_SEATS'; END IF;
  SELECT base_price INTO v_tour_price FROM public.tours WHERE id = v_availability.tour_id;
  IF v_tour_price IS NULL THEN RAISE EXCEPTION 'PRICE_NOT_FOUND'; END IF;
  v_total := v_tour_price * p_passenger_count;
  v_commission := round(v_total * 0.15, 2);
  UPDATE public.availability SET available_seats = available_seats - p_passenger_count, updated_at = NOW() WHERE id = p_availability_id;
  INSERT INTO public.reservations (availability_id, agency_id, user_id, status, total_price, commission_amount, passenger_count, lead_passenger_name, lead_passenger_document, expires_at)
  VALUES (p_availability_id, p_agency_id, v_user, 'confirmed', v_total, v_commission, p_passenger_count, trim(p_lead_passenger_name), NULLIF(trim(p_lead_passenger_document), ''), NULL)
  RETURNING id INTO v_reservation;
  v_token := encode(gen_random_bytes(24), 'hex');
  INSERT INTO public.vouchers (reservation_id, qr_code_token) VALUES (v_reservation, v_token);
  INSERT INTO public.audit_logs (user_id, action, table_name, record_id, new_value)
  VALUES (v_user, 'reservation.created', 'reservations', v_reservation, jsonb_build_object('availability_id', p_availability_id, 'passenger_count', p_passenger_count, 'total_price', v_total));
  RETURN QUERY SELECT v_reservation, v_token, v_availability.available_seats - p_passenger_count, v_total, v_commission;
END;
$$;
REVOKE ALL ON FUNCTION public.create_reservation(UUID, UUID, INT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_reservation(UUID, UUID, INT, TEXT, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION public.cancel_reservation(p_reservation_id UUID)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_user UUID := auth.uid(); v_role TEXT; v_res public.reservations%ROWTYPE;
BEGIN
  IF v_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  SELECT public.current_user_role() INTO v_role;
  SELECT * INTO v_res FROM public.reservations WHERE id = p_reservation_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'RESERVATION_NOT_FOUND'; END IF;
  IF v_res.status = 'cancelled' THEN RETURN TRUE; END IF;
  IF v_role NOT IN ('admin', 'operator') AND v_res.user_id <> v_user THEN RAISE EXCEPTION 'NOT_ALLOWED'; END IF;
  UPDATE public.reservations SET status = 'cancelled', updated_at = NOW() WHERE id = p_reservation_id;
  UPDATE public.availability SET available_seats = LEAST(total_seats, available_seats + v_res.passenger_count), updated_at = NOW() WHERE id = v_res.availability_id;
  INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_value, new_value)
  VALUES (v_user, 'reservation.cancelled', 'reservations', p_reservation_id, jsonb_build_object('status', v_res.status), jsonb_build_object('status', 'cancelled', 'passenger_count', v_res.passenger_count));
  RETURN TRUE;
END;
$$;
REVOKE ALL ON FUNCTION public.cancel_reservation(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cancel_reservation(UUID) TO authenticated;

CREATE INDEX IF NOT EXISTS idx_vouchers_reservation_id ON public.vouchers(reservation_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_agency_created ON public.reservations(agency_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_availability_date_status ON public.availability(date, status);
CREATE INDEX IF NOT EXISTS idx_availability_route_date ON public.availability(route_id, date);
