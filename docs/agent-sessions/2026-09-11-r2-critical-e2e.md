# R2 — Critical browser E2E

```yaml
context_token: CTX-20260911-R2-CRITICAL-E2E
base_ref: ffe7dc3797ef464489b686cb6cdc5a7b8dd2555c
docs_read:
  - README.md
  - BASELINE.md
  - AI_CONTEXT.md
  - INDEX.md
  - AGENT_PROTOCOL.md
  - docs/guides/TESTING.md
  - docs/architecture/modules/agency.md
  - docs/architecture/modules/voucher.md
code_inspected:
  - src/app/page.tsx
  - src/app/agency/page.tsx
  - src/components/agency/BookingModal.tsx
  - src/app/verify/[id]/page.tsx
  - supabase/migrations/20260911060000_r1_search_commission.sql
  - tests/integration/supabase-rls.test.mjs
assumptions:
  - "El gate E2E debe usar Supabase local efímero y no datos/credenciales remotos."
  - "El happy path agency es el siguiente P0 después de R1."
  - "Los cambios se agrupan antes de abrir el PR para reducir ejecuciones de GitHub Actions."
risks:
  - "Playwright añade costo de instalación de Chromium al gate."
  - "Un E2E happy-path no sustituye escenarios negativos, redención ni offline."
planned_invariants:
  - "no reduce RLS coverage"
  - "no usa service_role en navegador"
  - "inventario y comisión siguen autoritativos en PostgreSQL"
  - "no modifica package-lock.json para incorporar el runner E2E"
files_changed:
  - .github/workflows/e2e-critical.yml
  - .github/workflows/production-check.yml
  - .github/workflows/documentation-quality.yml
  - playwright.config.mjs
  - tests/e2e/setup-fixture.mjs
  - tests/e2e/critical-booking.spec.mjs
  - README.md
  - BASELINE.md
  - CHANGELOG.md
  - docs/guides/TESTING.md
  - docs/architecture/modules/agency.md
  - docs/agent-sessions/2026-09-11-r2-critical-e2e.md
commands_run:
  - "node --check playwright.config.mjs"
  - "node --check tests/e2e/setup-fixture.mjs"
  - "node --check tests/e2e/critical-booking.spec.mjs"
  - "workflow/docs validation delegated to PR gates after one grouped commit"
validation_results:
  - "PR #6 run 1: Documentation Quality verde"
  - "PR #6 run 1: Production Check verde"
  - "PR #6 run 1: Supabase start, db reset, fixture y Chromium verdes"
  - "PR #6 run 1: Critical E2E detectó selector de agencia demasiado estricto; URL /agency sí se alcanzó"
  - "selector corregido para validar nombre + comisión tal como se renderizan"
  - "Playwright actualizado de 1.55.0 a 1.63.0"
  - "stack E2E reducido a servicios necesarios mediante supabase start -x"
docs_updated:
  - README.md
  - BASELINE.md
  - CHANGELOG.md
  - docs/guides/TESTING.md
  - docs/architecture/modules/agency.md
remaining_risks:
  - "negative auth/role E2E"
  - "operator/guide redemption E2E"
  - "payments, holds and offline scenarios"
  - "deploy/rollback remains unproven"
```

## Decisiones resumidas

- El E2E usa la aplicación y Supabase reales; solo los datos de prueba son fixtures deterministas.
- Playwright queda fijado en `1.63.0` y se instala con `--no-save --package-lock=false` para preservar el lockfile autoritativo.
- El fixture crea una agencia, operador, ruta, tour, embarcación y disponibilidad futura; la prueba confirma reserva, voucher y decremento de cupos.
- El primer run demostró que login y redirect funcionaban; falló únicamente porque el test esperaba el nombre de agencia sin el sufijo visible `· comisión 20%`. Se corrigió el selector, no el producto.
- El gate excluye servicios Supabase no utilizados para reducir pulls, RAM y minutos de Actions.
- Los workflows rápidos reciben `concurrency` con `cancel-in-progress`; el workflow Supabase Integration no se modifica en este lote para no disparar una corrida costosa sin cambios de contrato de base.
- El PR se abrió únicamente después del commit inicial agrupado; la corrección se consolidó en un solo segundo commit.
