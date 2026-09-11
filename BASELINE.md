# BASELINE — Estado actual verificable

**Snapshot:** 2026-09-10  
**Referencia inicial:** `main@e0be4f592e5cac1b282a10afa1184829c68782fa`  
**Clasificación:** **UNSTABLE / NO PRODUCCIÓN**

Este archivo debe actualizarse cuando cambie materialmente el estado de salud del proyecto. No describe la aspiración; describe lo que existe.

## Resumen ejecutivo

La base tecnológica es recuperable: Next.js + Supabase, portales separados por rol y un motor de reservas atómico en PostgreSQL. Sin embargo, `main` no produce build de producción, el lockfile está desincronizado, no existe suite automatizada de tests, el aislamiento multiempresa/RLS es incompleto y varias pantallas administrativas son UI sin persistencia.

## Build y CI

| Métrica | Estado baseline |
|---|---|
| Documentación Quality | **verde** en PR #3 |
| Salud documental | **100/100; 12/12 módulos; freshness 100%** |
| Contratos RPC documentados | **5/5 detectados por CI** |
| Dependencias arquitectónicas declaradas | **16 validadas por CI** |
| `npm ci` | **falla: lockfile desincronizado** |
| `npm install` histórico | pasa, con vulnerabilidades |
| ESLint histórico | pasa con warnings |
| TypeScript | falla |
| `next build` | falla por typecheck |
| Tests automatizados | no configurados |
| Coverage instrumentada | **0% medido / no configurado** |
| CI de producción | rojo |

### Errores bloqueantes conocidos

1. `src/components/agency/BookingModal.tsx`: `tour` potencialmente `null` dentro de closure async.
2. `src/lib/supabase/proxy.ts`: acceso inseguro a `data.claims` de `getClaims()`.

## Dependencias

`package.json` declara actualmente:

- Next.js 16.3.4
- React / React DOM 19.2.4
- `@supabase/ssr ^0.12.7`
- `@supabase/supabase-js ^2.116.0`
- Tailwind CSS 4
- TypeScript 5

### Deuda P0 — reproducibilidad confirmada por CI

El nuevo gate ejecutó `npm ci` y falló exactamente porque `package.json` y `package-lock.json` no coinciden. Errores observados:

- faltan `@supabase/ssr@0.12.7` y `@supabase/supabase-js@2.116.0` en lockfile;
- `next@16.2.9` del lockfile no satisface `next@16.3.4`;
- `eslint-config-next@16.2.9` no satisface `16.3.4`;
- múltiples dependencias transitivas de Supabase/Next/Sharp están ausentes o en versiones incompatibles.

El gate debe permanecer rojo hasta regenerar el lockfile de forma controlada y revisar el diff. No sustituir `npm ci` por `npm install` en CI.

### Vulnerabilidades

El CI anterior basado en `npm install` reportó **6 vulnerabilidades: 4 high y 2 moderate**. El nuevo gate de `npm audit --audit-level=high` todavía no puede ejecutarse porque `npm ci` se detiene primero. No atribuir paquetes concretos hasta regenerar el lockfile y ejecutar `npm audit --json`.

## Funcionalidad operacional existente

### Auth

- Login email/password con Supabase.
- Session proxy SSR.
- Guards server-side para `admin`, `agency`, `operator`.
- Bug: login sin `next` redirige a `/admin` aunque el usuario no sea admin.

### Admin

- Dashboard consulta reservas/agencias/embarcaciones/disponibilidad reales.
- Directorio de agencias: lectura real; alta aún simulada.
- Tours: lectura real; alta aún simulada.
- Embarcaciones: lectura y alta reales.
- Auditoría: lectura de `audit_logs` real.
- Settings: mayormente UI; persistencia/integraciones no implementadas.

### Agency

- Búsqueda de disponibilidad real.
- Reserva mediante RPC transaccional.
- Historial de reservas real.
- Cancelación mediante RPC.
- Voucher accesible por token.

Problemas: filtro destino después de `LIMIT 50`; número de pasajeros se pierde al abrir modal; comisión 15% hardcodeada; estado del modal puede persistir entre reservas.

### Operator

- Gestión de cupos existente mediante RPC `update_availability_seats`.
- Dashboard operativo básico.
- No hay creación completa de salidas ni manifiesto/check-in.

### Voucher

- Token criptográfico y endpoint/página pública de verificación.
- Sin QR visual, PDF funcional, redención, doble-uso, reemisión ni offline.

## Datos y seguridad

Tablas base: roles, profiles, agencies, agencies_users, vessels, routes, tours, availability, reservations, vouchers, audit_logs.

Riesgos conocidos:

- Cobertura RLS incompleta o no demostrada para `routes`, `tours`, `agencies_users`.
- Policies de `operator` demasiado amplias; no aíslan claramente por organización/recurso.
- Signup local habilitado y password mínimo 6.
- No MFA.
- `supabase/config.toml` referencia `./seed.sql`, pero el archivo no está presente.

## Capacidades ausentes para producción

- Roles granulares de guía/staff.
- Modelo multiempresa robusto.
- CRUD completo de servicios/rutas/salidas.
- Holds con expiración.
- Pasajeros individuales/manifiesto.
- Pagos y conciliación.
- QR, redención y scanner.
- Notificaciones email/WhatsApp/SMS reales.
- Exportaciones/reportes.
- PWA/offline/sync/outbox.
- Observabilidad.
- Unit/integration/E2E tests.
- Runbook de deploy/rollback probado.

## Riesgo por área

| Área | Riesgo | Prioridad |
|---|---|---|
| Build reproducible | Crítico | P0 |
| Auth redirect | Alto | P0 |
| RLS/multitenancy | Crítico | P0 |
| Tests | Alto | P0/P1 |
| Voucher redemption | Alto | P1 |
| Pagos | Alto | P1 |
| Offline | Alto por contexto Galápagos | P1/P2 |
| Reportes | Medio | P2 |

## Criterio para cambiar a STABLE

Solo cuando: CI completo verde, lock reproducible, RLS testeado, pruebas mínimas automatizadas, flujos críticos E2E, cero vulnerabilidades critical/high sin excepción aprobada y documentación sincronizada.
