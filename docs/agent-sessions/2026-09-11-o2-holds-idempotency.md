# O2/C3.1 — Holds e idempotencia

```yaml
context_token: CTX-20260911-O2-HOLDS-IDEMPOTENCY
base_ref: 171f6cf791637c859d9439b49759ff2e22569594
docs_read:
  - README.md
  - BASELINE.md
  - AI_CONTEXT.md
  - INDEX.md
  - AGENT_PROTOCOL.md
  - CHANGELOG.md
  - docs/roadmap/ROADMAP.md
  - docs/guides/TESTING.md
  - docs/guides/PRODUCTION_READINESS.md
  - docs/architecture/api-contracts.md
  - docs/architecture/modules/data-layer.md
  - docs/architecture/modules/agency.md
code_inspected:
  - supabase/migrations/20260910190000_booking_engine.sql
  - supabase/migrations/20260911060000_r1_search_commission.sql
  - supabase/migrations/20260911090000_r3_voucher_redemption.sql
  - src/components/agency/BookingModal.tsx
  - tests/integration/supabase-rls.test.mjs
  - tests/integration/search-commission.test.mjs
assumptions:
  - "El flujo confirmado actual se conserva para no mezclar pagos con este slice."
  - "El hold se modela con reservations.status=held y expires_at, campos ya existentes."
  - "La idempotencia pertenece al usuario que crea el hold y se valida dentro de PostgreSQL."
risks:
  - "Todavía no existe payment ledger; confirmar un hold no representa cobro."
  - "El sweeper de expiración debe ejecutarse por llamada autorizada o job operativo antes de producción."
planned_invariants:
  - "cupos, holds y confirmación son atómicos en PostgreSQL"
  - "una clave idempotente no crea dos reservas"
  - "una clave reutilizada con payload distinto se rechaza"
  - "un usuario no puede confirmar holds de otro usuario"
  - "R3 voucher redemption y RLS existentes no se degradan"
commands_run:
  - "git fetch origin dev"
  - "npm run docs:validate"
  - "node --check tests/integration/holds-idempotency.test.mjs"
  - "npm test"
  - "npm run typecheck"
  - "npm run lint"
  - "npm audit --audit-level=high"
validation_results:
  - "docs:validate: passed; 10 RPC contracts documented"
  - "holds integration test syntax: passed"
  - "npm test: 7/7 passed"
  - "typecheck and lint: passed"
  - "npm audit: 0 vulnerabilities"
  - "Supabase integration pending CI because Docker is unavailable locally"
files_changed:
  - supabase/migrations/20260911100000_o2_holds_idempotency.sql
  - tests/integration/holds-idempotency.test.mjs
  - docs/architecture/api-contracts.md
  - docs/architecture/modules/data-layer.md
  - docs/architecture/modules/agency.md
  - docs/guides/TESTING.md
  - BASELINE.md
  - CHANGELOG.md
  - docs/roadmap/ROADMAP.md
  - docs/agent-sessions/2026-09-11-o2-holds-idempotency.md
docs_updated:
  - BASELINE.md
  - CHANGELOG.md
  - docs/architecture/api-contracts.md
  - docs/architecture/modules/data-layer.md
  - docs/architecture/modules/agency.md
  - docs/guides/TESTING.md
  - docs/roadmap/ROADMAP.md
remaining_risks:
  - "Supabase Integration debe validar la migración SQL y concurrencia en CI antes del merge."
  - "Payment ledger, UI hold → pago → confirmación, cancelación/reprogramación, observabilidad, backup/restore y deploy/rollback siguen pendientes."
```

## Hipótesis y chequeo

El schema ya contiene `reservations.expires_at` y el motor bloquea disponibilidad con `FOR UPDATE`; por ello el primer slice puede añadir holds mediante migración append-only y conservar el RPC confirmado existente. La prueba discriminante será una suite Supabase real que cubra creación, repetición idempotente, conflicto de payload, expiración/liberación, confirmación autorizada y concurrencia del último cupo.

## Decisión

Se separan creación de hold y confirmación para no afirmar que una reserva está pagada cuando aún no existe payment ledger. La emisión del voucher ocurre únicamente al confirmar.
