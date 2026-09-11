# Módulo Voucher

**Código:** `src/app/verify` y tabla `vouchers`.

Baseline: token aleatorio, asociación con reserva y verificación pública online. Aún no existe QR visual, PDF operativo, estado de redención, reemisión, revocación detallada ni offline.

Dirección: `ISSUED → REDEEMED`, con `REVOKED/EXPIRED`, tabla append-only de redenciones e idempotencia. QR offline debe ser firmado y contener datos mínimos.
