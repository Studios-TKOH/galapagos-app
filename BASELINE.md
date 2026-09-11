# BASELINE — Estado actual verificable

**Snapshot:** 2026-09-11  
**`dev` después de S0:** `c444066661db53a6ea80b43daaf728ee02c33d5a`  
**Clasificación de `main`:** **UNSTABLE / NO PRODUCCIÓN**

Este baseline distingue el estado recuperado de `dev` del estado de producción. S0 fue integrado en `dev`, pero el sistema completo todavía no cumple el criterio de producción porque faltan integración Supabase, E2E crítico y capacidades operativas P1.

## Resumen ejecutivo

La base Next.js + Supabase ya volvió a un estado construible y reproducible en `dev`. El PR #4 de S0 fue mergeado y los workflows post-merge `Production Check` y `Documentation Quality` finalizaron en verde.

R1 se concentra en demostrar seguridad multi-tenant contra una instancia Supabase real reseteada y, después, cerrar deuda funcional inmediata de búsqueda, comisión y CRUD prioritario.

## Evidencia S0 integrada

| Gate | Estado en `dev` |
|---|---|
| Documentation Quality | **verde** |
| `npm ci` | **verde** |
| `npm audit` | **0 vulnerabilidades** |
| ESLint | **verde** |
| TypeScript | **verde** |
| Tests S0 | **7/7** |
| `next build` | **verde; 14/14 rutas generadas** |
| CI post-merge PR #4 | **verde** |
| Integración Supabase runtime | pendiente de R1 |

S0 corrigió reproducibilidad, errores TypeScript/build, redirect por rol, signup sin rol implícito, gaps RLS, ownership de operador y checks internos de RPC `SECURITY DEFINER`.

## R1 — alcance activo

Rama de trabajo: `feature/r1-integration-functional`.

### R1.1 Seguridad e integración

- levantar Supabase local efímero en GitHub Actions;
- reset completo desde migraciones + seed;
- crear usuarios reales `admin`, `agency A/B`, `operator A/B` y perfil pendiente;
- demostrar accesos positivos/negativos de RLS;
- demostrar ownership en RPC de cupos/cancelación;
- impedir autoescalación de `profiles.role_id`;
- impedir `INSERT` directo de reservas que salte el motor transaccional;
- proporcionar aprovisionamiento de rol explícito y auditable mediante `assign_user_role`.

### R1.2 Funcionalidad inmediata

Después del gate de integración:

- mover búsqueda de destino al servidor para no filtrar después de `LIMIT 50`;
- sustituir comisión fija del motor/UI por configuración de dominio;
- priorizar CRUD admin actualmente simulado según impacto operacional;
- preparar E2E login → búsqueda → reserva → voucher.

## Dependencias

`package.json` declara:

- Next.js 16.3.4
- React / React DOM 19.2.4
- `@supabase/ssr ^0.12.7`
- `@supabase/supabase-js ^2.116.0`
- Tailwind CSS 4
- TypeScript 5

CI usa Node 22 para la aplicación y acciones de GitHub con runtime moderno. El workflow de integración fija Supabase CLI 2.117.0 para evitar drift de tooling.

## Funcionalidad operacional existente

### Auth

- Login email/password con Supabase.
- Session proxy SSR.
- Guards server-side para `admin`, `agency`, `operator`.
- Redirect post-login según rol.
- `next` solo acepta rutas internas del portal autorizado.
- Nuevos usuarios nacen con `role_id = NULL`.
- R1 añade protección runtime contra cambio de `role_id` por un usuario no admin y RPC administrativo auditable para aprovisionamiento.

### Admin

- Dashboard con datos reales.
- Agencias: lectura real; alta todavía simulada.
- Tours: lectura real; alta todavía simulada.
- Embarcaciones: lectura y alta reales.
- Auditoría: lectura real de `audit_logs`.
- Settings: mayormente UI sin persistencia/integraciones completas.

### Agency

- Búsqueda de disponibilidad real.
- Número de pasajeros se conserva al abrir reserva.
- Reserva mediante RPC transaccional.
- Historial real y cancelación mediante RPC.
- Voucher accesible por token.

Deuda: filtro textual todavía debe migrarse a servidor; comisión sigue fija en 15%; falta hold/pago/pasajeros individuales.

### Operator

- Gestión de cupos mediante RPC.
- Lectura/mutación restringida a embarcaciones propias y recursos derivados.
- Dashboard operativo básico.
- Falta creación completa de salidas, manifiesto y check-in.

### Voucher

- Token criptográfico.
- Verificación pública online.
- Visibilidad autenticada restringida por reserva/ownership.
- Falta QR visual, PDF operativo, redención, doble-uso, reemisión y offline.

## Datos y seguridad

Tablas base: roles, profiles, agencies, agencies_users, vessels, routes, tours, availability, reservations, vouchers, audit_logs.

R1 incorpora un gate vivo porque los tests de texto/contrato no pueden demostrar por sí solos que PostgREST, Auth, RLS y `SECURITY DEFINER` interactúan correctamente.

Riesgos abiertos:

- signup productivo debe ser invitation-only o equivalente;
- password policy local sigue por debajo del objetivo productivo;
- MFA no configurado;
- operador multiempresa continúa modelado indirectamente por `vessels.owner_id`;
- todavía falta E2E crítico de navegador.

## Capacidades ausentes para producción completa

- Roles granulares de guía/staff.
- Organización multiusuario de operadores robusta.
- CRUD completo de servicios/rutas/salidas.
- Holds con expiración.
- Pasajeros individuales/manifiesto.
- Pagos y conciliación.
- QR/redención/scanner.
- Notificaciones reales.
- Exportaciones/reportes.
- PWA/offline/sync/outbox.
- Observabilidad.
- Cobertura unit/integration/E2E suficiente.
- Runbook de deploy/rollback probado.

## Riesgo por área

| Área | Riesgo actual | Prioridad |
|---|---|---|
| Build reproducible | reparado y verde en `dev` | cerrado S0 |
| Auth redirect | reparado y testeado | cerrado S0 |
| RLS/multitenancy | contrato endurecido; prueba runtime R1 activa | P0 |
| Tests | unit/contract presentes; integración en incorporación | P0 |
| Búsqueda disponibilidad | filtro cliente tras límite | P1 |
| Comisión | 15% hardcodeado | P1 |
| Voucher redemption | no implementado | P1 |
| Pagos | no implementado | P1 |
| Offline | no implementado; impacto alto en Galápagos | P1/P2 |
| Reportes | incompleto | P2 |

## Criterio para cambiar a STABLE

Solo cuando existan: CI completo verde, lock reproducible, integración RLS positiva/negativa, E2E del flujo crítico, cero vulnerabilidades critical/high sin excepción aprobada, documentación sincronizada y un entorno de despliegue/rollback probado. `dev` puede seguir avanzando por fases sin declarar `main` productivo antes de cumplir ese criterio.
