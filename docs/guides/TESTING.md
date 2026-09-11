# Estrategia de testing

El proyecto ya tiene tres capas verificables: tests rápidos con `node:test`, integración real contra Supabase local y un gate E2E crítico de navegador con Playwright. Todavía no existe coverage instrumentada; por tanto el baseline de cobertura sigue siendo **0% medido/no configurado**, no 0% lógico.

**Estado actual:** R2 ya fue mergeado a `dev` y el gate `Critical E2E` terminó verde sobre el flujo comercial crítico. El baseline autoritativo está en `BASELINE.md`.

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

R2 confirmó este flujo en verde. La primera ejecución detectó un selector Playwright demasiado estricto para el nombre de la agencia; se corrigió el test sin modificar lógica productiva y el segundo run completó el journey completo.

Playwright se instala de forma transitoria y con versión fijada en ese workflow para no alterar el lockfile principal solo por el runner E2E. La versión fijada de R2 es `@playwright/test@1.63.0`. Si la suite crece y se convierte en una dependencia cotidiana de desarrollo, debe evaluarse moverlo a `devDependencies` en un cambio explícito.

Para reducir minutos de CI, el gate inicia únicamente los servicios locales necesarios para este flujo: PostgreSQL, Auth, PostgREST y Kong. Studio, Realtime, Storage, Mailpit, Edge Runtime, analytics/vector y servicios auxiliares permanecen excluidos.

## Ejecución local del E2E

Con Docker y Supabase CLI disponibles:

```bash
supabase start -x realtime,storage-api,imgproxy,mailpit,postgres-meta,studio,edge-runtime,logflare,vector,supavisor
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
npm install --no-save --package-lock=false @playwright/test@1.63.0
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
- idempotencia de creación y conflicto de payload;
- confirmación autorizada de hold con emisión única de voucher;
- redención única;
- voucher válido, ya redimido, inexistente y cancelado;
- roles autorizados/no autorizados, ownership de operador y concurrencia de redención;
- payment ledger.

### E2E

El happy path agency ya tiene gate verde e integrado. Permanecen:

- login/guards negativos por rol;
- cancelación y reprogramación;
- operador y redención online: login, verificación, confirmación y segundo intento bloqueado;
- pagos/conciliación;
- errores de conectividad y recuperación.

El siguiente frente recomendado, R3, debe añadir pruebas de redención positiva/negativa y protección contra doble uso antes de considerarse completo.

### Offline E2E

- scanner en modo avión;
- doble scan local;
- dos dispositivos;
- reconnect/outbox;
- conflicto de redención.

## Regla de cobertura

Mientras no exista herramienta de coverage, el baseline se reporta como `0% medido/no configurado`. Al instrumentarla, registrar porcentaje exacto en `BASELINE.md`; desde ese punto ningún PR puede reducirlo sin excepción aprobada y justificada.
