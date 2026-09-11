# Contratos RPC / API de base de datos

Los marcadores `API_CONTRACT` se comparan automáticamente contra funciones con `GRANT EXECUTE` presentes en `supabase/migrations/*.sql`.

<!-- API_CONTRACT current_user_role() -->
<!-- API_CONTRACT verify_voucher(TEXT) -->
<!-- API_CONTRACT create_reservation(UUID,UUID,INT,TEXT,TEXT) -->
<!-- API_CONTRACT cancel_reservation(UUID) -->
<!-- API_CONTRACT update_availability_seats(UUID,INT) -->

## `current_user_role()`

Helper de autorización. Devuelve el nombre del rol del usuario autenticado. No debe utilizarse como sustituto de aislamiento por organización.

## `verify_voucher(TEXT)`

Valida token de voucher y devuelve información pública operacional. Actualmente requiere backend online para consultar PostgreSQL. El diseño offline futuro debe usar QR firmado sin PII innecesaria.

## `create_reservation(UUID, UUID, INT, TEXT, TEXT)`

Crea una reserva confirmada de forma atómica, bloquea la fila de disponibilidad, valida cupos, calcula importe/comisión, reduce inventario, crea voucher y audit log.

Limitaciones baseline: comisión hardcodeada; precio depende de tour; no existe hold/pago previo.

## `cancel_reservation(UUID)`

Cancela y devuelve cupos. Debe evolucionar con políticas de cancelación, ownership por organización e idempotencia.

## `update_availability_seats(UUID, INT)`

Ajusta cupos disponibles validando reservas existentes. Solo operadores autorizados/admin deberían modificar recursos que pertenecen a su organización.

## Cambio de contrato

Cualquier cambio de firma debe modificar este archivo en el mismo PR. CI falla si los `GRANT EXECUTE` y estos marcadores divergen.
