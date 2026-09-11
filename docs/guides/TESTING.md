# Estrategia de testing

Baseline: no existe test runner/suite suficiente ni coverage instrumentada. Esto es deuda P0/P1.

## Pirámide objetivo

### Unit
Pricing, estados, validadores, mapping y utilidades puras.

### Integration/PostgreSQL
- reserva concurrente último cupo;
- cancelación restaura cupos;
- RLS positivo/negativo por rol y organización;
- idempotencia;
- redención única;
- payment ledger.

### E2E
- login por rol;
- agency busca/reserva;
- voucher se emite;
- operator/guide redime;
- cancelación/reprogramación.

### Offline E2E
- scanner en modo avión;
- doble scan local;
- dos dispositivos;
- reconnect/outbox;
- conflicto de redención.

## Regla de cobertura

Mientras no exista herramienta, baseline se reporta como `0% medido/no configurado`, no como 0% lógico. Al instrumentar coverage, registrar porcentaje exacto en `BASELINE.md`; desde ese punto ningún PR puede reducirlo sin excepción aprobada y justificada.
