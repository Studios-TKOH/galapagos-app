# BASELINE — Estado actual verificable

**Snapshot de producción:** 2026-09-10  
**Referencia inicial:** `main@e0be4f592e5cac1b282a10afa1184829c68782fa`  
**Clasificación de `main`:** **UNSTABLE / NO PRODUCCIÓN**

Este archivo separa deliberadamente el estado de `main` del trabajo de estabilización todavía no promovido. No declarar STABLE hasta que el PR de S0 tenga CI completo verde y sea integrado mediante el flujo aprobado.

## Resumen ejecutivo

La base tecnológica es recuperable: Next.js + Supabase, portales separados por rol y un motor de reservas atómico en PostgreSQL. `main` sigue siendo el baseline roto auditado, pero la rama `fix/s0-stabilization` ya contiene reparaciones para reproducibilidad, TypeScript/auth y hardening RLS que deben validarse antes de promoción.

## Estado de `main` auditado

| Métrica | Estado baseline |
|---|---|
| Documentation Quality | verde en el sistema de gobierno |
| Salud documental | 100/100; 12/12 módulos; freshness 100% |
| Contratos RPC documentados | 5/5 detectados por CI |
| Dependencias arquitectónicas declaradas | 16 validadas por CI |
| `npm ci` | fallaba por lockfile desincronizado |
| TypeScript | fallaba |
| `next build` | fallaba por typecheck |
| Tests automatizados | no configurados |
| CI de producción | rojo |

## S0 — estabilización bajo validación

En `fix/s0-stabilization` se han aplicado los siguientes cambios sin declarar todavía producción estable:

- `package-lock.json` regenerado en runner limpio y validado con `npm ci`.
- `BookingModal.tsx`: se conserva una referencia no-null antes del closure async.
- `src/lib/supabase/proxy.ts`: `getClaims()` tolera `data=null`/error sin desestructuración insegura.
- Login: resolución de portal por rol; `next` solo se acepta dentro del área del rol autenticado.
- Nuevos perfiles: `role_id=NULL` hasta asignación administrativa; no existe rol operacional implícito.
- RLS explícito para `agencies_users`, `routes`, `tours`.
- Operadores limitados a su propia flota en vessels/availability/reservations/vouchers.
- RPCs `cancel_reservation` y `update_availability_seats` validan ownership explícitamente porque `SECURITY DEFINER` puede saltarse RLS del caller.
- `supabase/seed.sql` existe y es determinista/minimalista.
- Suite mínima S0 añadida con `node:test` para routing y contratos de seguridad.

### Estado de validación S0

| Gate | Estado |
|---|---|
| Lockfile reproducible | **reparado; requiere CI final de PR** |
| Documentación ↔ código | en ejecución continua |
| Typecheck | pendiente de corrida final tras todos los cambios |
| Tests S0 | pendiente de corrida final de PR |
| Dependency audit | pendiente tras instalación limpia |
| Production build | pendiente de corrida final |
| RLS local/integration reset | contrato SQL cubierto; integración Supabase completa pendiente |

## Dependencias

`package.json` declara:

- Next.js 16.3.4
- React / React DOM 19.2.4
- `@supabase/ssr ^0.12.7`
- `@supabase/supabase-js ^2.116.0`
- Tailwind CSS 4
- TypeScript 5

El lockfile de S0 contiene estas dependencias y versiones coherentes. CI debe seguir usando `npm ci`; no volver a `npm install` como mecanismo de ocultación de drift.

## Vulnerabilidades

El CI histórico reportó **6 vulnerabilidades: 4 high y 2 moderate** sobre una resolución no reproducible. Esa cifra no debe considerarse el estado final de S0. El gate `npm audit --audit-level=high` se ejecutará sobre el lockfile reparado y cualquier high/critical restante bloqueará promoción salvo excepción documentada.

## Funcionalidad operacional existente

### Auth

- Login email/password con Supabase.
- Session proxy SSR.
- Guards server-side para `admin`, `agency`, `operator`.
- En S0: redirect post-login por rol y validación segura de `next`.
- En S0: cuentas sin rol operativo son cerradas tras login y deben ser aprovisionadas explícitamente.

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

Deuda restante: filtro destino después de `LIMIT 50`; número de pasajeros del buscador aún no se transfiere al modal; comisión 15% hardcodeada; falta hold/pago/pasajeros individuales.

### Operator

- Gestión de cupos mediante RPC `update_availability_seats`.
- Dashboard operativo básico.
- En S0: lectura y mutaciones quedan restringidas por ownership de embarcación.
- No hay creación completa de salidas ni manifiesto/check-in.

### Voucher

- Token criptográfico y página pública de verificación.
- En S0: operadores solo pueden leer vouchers de reservas correspondientes a su propia flota.
- Sin QR visual, PDF funcional, redención, doble-uso, reemisión ni offline.

## Datos y seguridad

Tablas base: roles, profiles, agencies, agencies_users, vessels, routes, tours, availability, reservations, vouchers, audit_logs.

S0 cierra los gaps RLS previamente identificados para `routes`, `tours`, `agencies_users` y elimina el acceso operator global a recursos ajenos. Sigue pendiente una suite de integración real con Supabase que demuestre casos positivos/negativos contra una base reseteada.

Riesgos todavía abiertos:

- configuración productiva de signup debe bloquearse/invitación-only además del hardening de perfil sin rol;
- password policy local continúa siendo un parámetro de entorno a endurecer para producción;
- MFA aún no configurado;
- modelo de organización de operadores sigue representado indirectamente por `vessels.owner_id`, suficiente para S0 pero no necesariamente para el modelo multiempresa final.

## Capacidades ausentes para producción completa

- Roles granulares de guía/staff.
- Organización multiusuario de operadores robusta.
- CRUD completo de servicios/rutas/salidas.
- Holds con expiración.
- Pasajeros individuales/manifiesto.
- Pagos y conciliación.
- QR, redención y scanner.
- Notificaciones email/WhatsApp/SMS reales.
- Exportaciones/reportes.
- PWA/offline/sync/outbox.
- Observabilidad.
- Unit/integration/E2E suficientes para los flujos críticos.
- Runbook de deploy/rollback probado en entorno real.

## Riesgo por área

| Área | Riesgo actual | Prioridad |
|---|---|---|
| Build reproducible | S0 reparado, validación final pendiente | P0 |
| Auth redirect | S0 reparado, tests pendientes de CI | P0 |
| RLS/multitenancy | hardening S0 aplicado; integración pendiente | P0 |
| Tests | suite mínima creada, cobertura aún baja | P0/P1 |
| Voucher redemption | no implementado | P1 |
| Pagos | no implementado | P1 |
| Offline | no implementado; alto impacto en Galápagos | P1/P2 |
| Reportes | incompleto | P2 |

## Criterio para cambiar a STABLE

Solo cuando: CI completo verde, lock reproducible, RLS testeado con integración positiva/negativa, pruebas mínimas automatizadas, flujo crítico E2E, cero vulnerabilidades critical/high sin excepción aprobada y documentación sincronizada. La estabilización S0 puede cerrar los P0 sin implicar que todas las features de producción ya estén construidas.
