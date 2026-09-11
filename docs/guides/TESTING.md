# Estrategia de testing

El proyecto ya tiene tres capas verificables: tests rápidos con `node:test`, integración real contra Supabase local y un gate E2E crítico de navegador con Playwright. Todavía no existe coverage instrumentada; por tanto el baseline de cobertura sigue siendo **0% medido/no configurado**, no 0% lógico.

## Gates actuales

### Unit / contract

```bash
npm test
```

Cubre routing seguro y contratos de seguridad que deben fallar rápido antes de levantar infraestructura.

### Integration / PostgreSQL

```bash
npm run test:integration
```

Requiere un Supabase local y valida Auth, PostgREST, RLS, ownership y RPCs reales. R1 estableció un baseline de **18/18** pruebas verdes.

### Critical E2E

El workflow `Critical E2E` reconstruye Supabase desde cero, crea un fixture determinista y ejecuta Chromium contra la aplicación Next.js real. El happy path obligatorio cubre:

1. login de usuario agency;
2. carga de la membresía/agencia;
3. búsqueda server-side de disponibilidad;
4. reserva de dos pasajeros mediante `create_reservation`;
5. total y comisión devueltos por PostgreSQL;
6. apertura y verificación pública del voucher;
7. comprobación de que el inventario pasó de 10 a 8 cupos.

No usa mocks para Auth, Data API, RLS, reserva ni voucher.

Playwright se instala de forma transitoria y con versión fijada en ese workflow para no alterar el lockfile principal solo por el runner E2E. Si la suite crece y se convierte en una dependencia cotidiana de desarrollo, debe evaluarse moverlo a `devDependencies` en un cambio explícito.

## Ejecución local del E2E

Con Docker y Supabase CLI disponibles:

```bash
supabase start
supabase db reset

eval "$(supabase status -o env)"
export SUPABASE_URL="$API_URL"
export SUPABASE_ANON_KEY="$ANON_KEY"
export SUPABASE_SERVICE_ROLE_KEY="$SERVICE_ROLE_KEY"
export NEXT_PUBLIC_SUPABASE_URL="$API_URL"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="$ANON_KEY"
export E2E_AGENCY_EMAIL="e2e-agency@example.test"
export E2E_AGENCY_PASSWORD="E2E-Password!42"

node tests/e2e/setup-fixture.mjs
npm install --no-save --package-lock=false @playwright/test@1.55.0
npx playwright install chromium
npx playwright test --config=playwright.config.mjs

supabase stop --no-backup
```

En PowerShell, exportar las mismas variables con `$env:NOMBRE = "valor"`.

## Pirámide objetivo

### Unit

Pricing, estados, validadores, mapping y utilidades puras.

### Integration/PostgreSQL

Además del baseline R1:

- reserva concurrente del último cupo;
- hold + expiración;
- idempotencia;
- redención única;
- payment ledger.

### E2E

El happy path agency ya tiene gate. Permanecen:

- login/guards negativos por rol;
- cancelación y reprogramación;
- operador/guide y redención;
- pagos/conciliación;
- errores de conectividad y recuperación.

### Offline E2E

- scanner en modo avión;
- doble scan local;
- dos dispositivos;
- reconnect/outbox;
- conflicto de redención.

## Regla de cobertura

Mientras no exista herramienta de coverage, el baseline se reporta como `0% medido/no configurado`. Al instrumentarla, registrar porcentaje exacto en `BASELINE.md`; desde ese punto ningún PR puede reducirlo sin excepción aprobada y justificada.
