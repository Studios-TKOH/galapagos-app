# Módulo Agency

**Código:** `src/app/agency`, `src/components/agency`.

Responsabilidad: consultar disponibilidad, reservar, consultar/cancelar reservas y acceder al voucher.

Baseline: reserva real mediante `create_reservation`, historial/cancelación reales. Deuda: pasajeros del buscador no se transfieren correctamente al modal; filtro destino ocurre después de `LIMIT`; comisión fija 15%; falta hold/pago/pasajeros individuales.

Invariantes: una agencia solo accede a su organización; inventario final lo decide RPC; UI no inventa cupos ni pagos.
