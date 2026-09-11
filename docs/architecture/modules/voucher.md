# Módulo Voucher

**Código:** `src/app/verify` y tabla `vouchers`.

Baseline: token aleatorio, asociación con reserva y verificación pública online. Aún no existe QR visual, PDF operativo, estado de redención, reemisión, revocación detallada ni offline.

## Estado S0

La página pública continúa verificando mediante RPC `verify_voucher`. El cliente Supabase del componente ahora se memoiza para conservar una referencia estable entre renders y el efecto declara explícitamente `params.id` y `supabase` como dependencias, eliminando el warning de hooks sin cambiar el contrato público.

El hardening S0 restringe la lectura autenticada de vouchers por ownership cuando participa un operador. La verificación pública mediante token continúa siendo un flujo separado y no equivale a redención.

## Dirección

`ISSUED → REDEEMED`, con `REVOKED/EXPIRED`, tabla append-only de redenciones e idempotencia. QR offline debe ser firmado y contener datos mínimos.

## Invariantes

- verificar no consume un voucher hasta que exista el dominio explícito de redención;
- no exponer PII adicional en el payload público;
- el cliente Supabase usado por efectos debe mantener identidad estable;
- cambios de firma de `verify_voucher` deben actualizar `docs/architecture/api-contracts.md`.
