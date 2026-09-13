# Contratos RPC / API de base de datos

Los marcadores `API_CONTRACT` se comparan automáticamente contra funciones con `GRANT EXECUTE` presentes en `supabase/migrations/*.sql`.

<!-- API_CONTRACT current_user_role() -->
<!-- API_CONTRACT verify_voucher(TEXT) -->
<!-- API_CONTRACT search_availability(DATE,TEXT,INT) -->
<!-- API_CONTRACT create_reservation(UUID,UUID,INT,TEXT,TEXT) -->
<!-- API_CONTRACT cancel_reservation(UUID) -->
<!-- API_CONTRACT update_availability_seats(UUID,INT) -->
<!-- API_CONTRACT assign_user_role(UUID,TEXT) -->
<!-- API_CONTRACT redeem_voucher(TEXT) -->
<!-- API_CONTRACT create_reservation_hold(UUID,UUID,INT,TEXT,TEXT,TEXT,INT) -->
<!-- API_CONTRACT confirm_reservation_hold(UUID) -->

## `current_user_role()`

Helper de autorización. Devuelve el nombre del rol del usuario autenticado. No debe utilizarse como sustituto de aislamiento por organización.

## `verify_voucher(TEXT)`

Valida token de voucher y devuelve información pública operacional. Actualmente requiere backend online para consultar PostgreSQL. El diseño offline futuro debe usar QR firmado sin PII innecesaria.

## `search_availability(DATE, TEXT, INT)`

Busca salidas activas filtrando fecha, texto de ruta/origen/destino y capacidad mínima antes de aplicar `LIMIT 50`. Es `SECURITY INVOKER`, por lo que las policies RLS de disponibilidad, embarcaciones, rutas y tours siguen aplicándose al caller. Devuelve un resultado plano listo para la UI de agencia.

## `create_reservation(UUID, UUID, INT, TEXT, TEXT)`

Crea una reserva confirmada de forma atómica, bloquea la fila de disponibilidad, valida cupos, calcula importe/comisión, reduce inventario, crea voucher y audit log.

La comisión se obtiene de `agencies.commission_rate`; la tasa por defecto actual es 15%, pero puede configurarse por agencia sin cambiar el código cliente ni la firma del RPC. El precio continúa dependiendo del tour y todavía no existe hold/pago previo.

La tabla `reservations` no admite `INSERT` directo para usuarios autenticados: la creación debe pasar por este RPC para preservar lock de cupos, validación de agencia y auditoría.

## `cancel_reservation(UUID)`

Cancela y devuelve cupos. Valida ownership de agencia/operador dentro del propio RPC porque es `SECURITY DEFINER`.

## `update_availability_seats(UUID, INT)`

Ajusta cupos disponibles validando reservas existentes. Operadores solo pueden modificar disponibilidad de embarcaciones cuyo `owner_id` coincide con el usuario autenticado; admin conserva alcance global.

## `assign_user_role(UUID, TEXT)`

Aprovisiona explícitamente `admin`, `agency` u `operator` para un perfil existente. Solo un usuario con rol `admin` puede ejecutarlo. El cambio genera `audit_logs`; un usuario no puede modificar su propio `role_id` para elevar privilegios.

## `redeem_voucher(TEXT)`

Redime un voucher emitido de forma atómica para un usuario autenticado con rol `admin` u `operator`. Bloquea la fila del voucher, rechaza vouchers inexistentes, cancelados, revocados, expirados o ya redimidos, y exige que un operador sea propietario de la embarcación de la salida. Persiste el estado `redeemed`, una fila append-only en `voucher_redemptions` y un evento `audit_logs`; la redención no puede realizarse mediante mutaciones directas del cliente.

## `create_reservation_hold(UUID, UUID, INT, TEXT, TEXT, TEXT, INT)`

Crea un hold de inventario con estado `held`, expiración y clave idempotente por usuario. Bloquea la disponibilidad en PostgreSQL, libera holds vencidos de esa salida antes de comprobar cupos y rechaza la reutilización de una clave con un payload diferente. No emite voucher ni representa un pago.

## `confirm_reservation_hold(UUID)`

Confirma un hold no vencido perteneciente a la agencia solicitante o a un admin y emite el voucher dentro de la misma transacción. Un hold expirado libera sus cupos y no puede confirmarse.

## Cambio de contrato

Cualquier cambio de firma debe modificar este archivo en el mismo PR. CI falla si los `GRANT EXECUTE` y estos marcadores divergen.
