-- O2 follow-up fix:
-- Avoid PL/pgSQL output-column name collisions in confirm_reservation_hold.

CREATE OR REPLACE FUNCTION public.confirm_reservation_hold(p_reservation_id UUID)
RETURNS TABLE (
  reservation_id UUID,
  reservation_status TEXT,
  voucher_token TEXT,
  total_price NUMERIC,
  commission_amount NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_user UUID := auth.uid();
  v_role TEXT;
  v_res public.reservations%ROWTYPE;
  v_availability_id UUID;
  v_token TEXT;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'AUTH_REQUIRED';
  END IF;

  SELECT r.availability_id
    INTO v_availability_id
  FROM public.reservations AS r
  WHERE r.id = p_reservation_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'RESERVATION_NOT_FOUND';
  END IF;

  PERFORM 1
  FROM public.availability AS a
  WHERE a.id = v_availability_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'AVAILABILITY_NOT_FOUND';
  END IF;

  PERFORM public.release_expired_holds(v_availability_id);

  SELECT r.*
    INTO v_res
  FROM public.reservations AS r
  WHERE r.id = p_reservation_id
  FOR UPDATE;

  SELECT public.current_user_role()
    INTO v_role;

  IF v_role NOT IN ('admin', 'agency') THEN
    RAISE EXCEPTION 'ROLE_NOT_ALLOWED';
  END IF;

  IF v_role = 'agency'
     AND NOT (
       v_res.user_id = v_user
       AND EXISTS (
         SELECT 1
         FROM public.agencies_users AS au
         WHERE au.agency_id = v_res.agency_id
           AND au.user_id = v_user
       )
     )
  THEN
    RAISE EXCEPTION 'NOT_ALLOWED';
  END IF;

  IF v_res.status = 'confirmed' THEN
    SELECT v.qr_code_token
      INTO v_token
    FROM public.vouchers AS v
    WHERE v.reservation_id = v_res.id
    LIMIT 1;

    RETURN QUERY
    SELECT
      v_res.id,
      v_res.status,
      v_token,
      v_res.total_price,
      v_res.commission_amount;

    RETURN;
  END IF;

  IF v_res.status <> 'held' THEN
    RAISE EXCEPTION 'RESERVATION_NOT_CONFIRMABLE';
  END IF;

  IF v_res.expires_at IS NULL
     OR v_res.expires_at <= NOW()
  THEN
    PERFORM public.release_expired_holds(v_res.availability_id);
    RAISE EXCEPTION 'HOLD_EXPIRED';
  END IF;

  UPDATE public.reservations AS r
  SET
    status = 'confirmed',
    expires_at = NULL,
    updated_at = NOW()
  WHERE r.id = v_res.id;

  v_token := encode(
    extensions.gen_random_bytes(24),
    'hex'
  );

  INSERT INTO public.vouchers (
    reservation_id,
    qr_code_token
  )
  VALUES (
    v_res.id,
    v_token
  );

  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_value,
    new_value
  )
  VALUES (
    v_user,
    'reservation.confirmed',
    'reservations',
    v_res.id,
    jsonb_build_object(
      'status', 'held',
      'expires_at', v_res.expires_at
    ),
    jsonb_build_object(
      'status', 'confirmed',
      'voucher_issued', TRUE
    )
  );

  RETURN QUERY
  SELECT
    v_res.id,
    'confirmed'::TEXT,
    v_token,
    v_res.total_price,
    v_res.commission_amount;
END;
$function$;