# BASELINE — Estado actual verificable

**Snapshot:** 2026-09-11  
**`dev` después de R3:** `2c09b42e6faa2a580f2a6dae02e76f15c9ced078`
**Clasificación de `main`:** **UNSTABLE / NO PRODUCCIÓN**

Este baseline distingue un `dev` estabilizado de un producto listo para producción. S0, R1, R2 y R3 ya están integrados en `dev`. `main` sigue UNSTABLE porque aún faltan despliegue/rollback probado, pagos/conciliación y otras capacidades P1.

## Resumen ejecutivo

El estado actual de `dev` tiene las siguientes garantías verificadas:

| Gate / garantía | Evidencia |
|---|---|
| Documentation Quality post-merge | **verde** |
| Production Check post-merge | **verde** |
| `npm ci` | **verde** |
| `npm audit` | **0 vulnerabilidades** |
| ESLint | **verde** |
| TypeScript | **verde** |
| Tests rápidos S0 | **7/7** |
| `next build` | **verde** |
| Supabase local + `db reset` | **verde en R1** |
| Integración Auth/RLS/RPC/PostgREST | **18/18 en R1** |
| Critical E2E browser | **verde en R2** |

La integración reconstruye un stack Supabase efímero desde migraciones + seed y no depende de claves ni datos del proyecto remoto.

## S0 — estabilización: integrado en `dev`

S0 recuperó build reproducible, lockfile coherente, auth por rol, RLS mínimo, seguridad de RPC y gates básicos de producción.

## R1.1 — seguridad e integración: integrado en `dev`

Quedaron demostrados en runtime:

- un usuario nuevo permanece sin rol operativo;
- un usuario no admin no puede autoasignarse `role_id`;
- admin puede aprovisionar roles mediante `assign_user_role(UUID,TEXT)` y la acción se audita;
- agency A/B permanece aislada por membresía;
- operator A/B solo ve y muta su propia flota y recursos derivados;
- `INSERT` directo de reservas está bloqueado: la creación debe pasar por `create_reservation`;
- una agencia no puede reservar en nombre de otro tenant;
- reserva autorizada decrementa inventario atómicamente;
- RPCs de cupos/cancelación rechazan mutaciones cross-operator;
- cancelación invalida el voucher para verificación pública;
- admin mantiene visibilidad global donde corresponde.

Los tests vivos detectaron y permitieron corregir dos defectos que build/typecheck no podían encontrar:

1. ambigüedad PL/pgSQL en `available_seats` dentro de `create_reservation`;
2. `gen_random_bytes()` no visible con `search_path = public`; el token usa explícitamente `extensions.gen_random_bytes(24)`.

## R1.2 — funcionalidad inmediata: integrada en `dev`

### Búsqueda de agencia

- `search_availability(DATE,TEXT,INT)` filtra fecha, ruta/origen/destino y pasajeros en PostgreSQL antes del `LIMIT 50`;
- la función es `SECURITY INVOKER`, preservando RLS del caller;
- una prueba crea más de 50 salidas no coincidentes y demuestra que una coincidencia posterior no se pierde por el límite;
- la pantalla usa un contexto de agencia explícito cuando el usuario pertenece a varias organizaciones.

### Comisión

- `agencies.commission_rate` es la fuente de verdad;
- valor por defecto actual: 15%; rango permitido 0..100%;
- `create_reservation` calcula y persiste la comisión en PostgreSQL;
- la UI solo muestra una estimación y presenta como definitivos los valores retornados por el RPC;
- integración validada con una agencia de 20% para demostrar que ya no existe un 15% fijo en el motor.

### Admin

- alta de agencias persiste nombre, RUC, contacto, dirección y comisión;
- alta de tours persiste nombre, descripción y precio base;
- una agencia no puede ejecutar esas altas por RLS;
- se eliminaron campos de formularios que no tenían representación en el modelo y se descartaban silenciosamente.

## R2 — Critical E2E: integrado en `dev`

R2 incorporó un gate Playwright que usa la aplicación Next.js real y un Supabase local efímero. El flujo validado es:

`login agency → membresía/agencia → búsqueda → reserva → voucher público → inventario actualizado`

El fixture usa precio USD 40, comisión 20%, 10 cupos y reserva de dos pasajeros. La ejecución verde confirmó:

- login y redirect correcto a `/agency`;
- carga de membresía/agencia;
- búsqueda real de disponibilidad;
- reserva de 2 pasajeros;
- total USD 80;
- comisión USD 16;
- voucher público válido;
- decremento de inventario de 10 a 8 cupos.

El gate no mockea Auth, PostgREST, RLS, RPC, inventario ni verificación de voucher. La primera ejecución detectó únicamente un selector E2E demasiado estricto; no fue una regresión funcional. El segundo run pasó completo y el PR #6 fue mergeado a `dev`.

Para reducir consumo de GitHub Actions, `Production Check`, `Documentation Quality` y `Critical E2E` cancelan ejecuciones obsoletas del mismo PR/ref mediante `concurrency`. El stack E2E excluye servicios Supabase que no intervienen en el flujo crítico.

## Funcionalidad operacional actual

### Auth

- Login email/password con Supabase.
- Session proxy SSR.
- Guards server-side para `admin`, `agency`, `operator`.
- Redirect post-login según rol y `next` restringido al portal autorizado.
- Nuevos usuarios nacen con `role_id = NULL`.
- Cambio de rol operacional requiere admin y RPC auditable.

### Admin

- Dashboard con datos reales.
- Agencias: lectura + alta reales.
- Tours: lectura + alta reales.
- Embarcaciones: lectura + alta reales.
- Auditoría: lectura real de `audit_logs`.
- Pendiente: edición/eliminación, rutas administrables, aprovisionamiento UI de usuarios/membresías y settings persistentes.

### Agency

- búsqueda server-side de disponibilidad real;
- selección explícita de agencia cuando hay múltiples membresías;
- comisión configurable por agencia;
- reserva mediante RPC transaccional;
- historial y cancelación reales;
- voucher accesible por token;
- happy path comercial cubierto por E2E real.

Pendiente: hold con expiración, pago/conciliación, pasajeros individuales y escenarios E2E negativos/cancelación.

### Operator

- gestión de cupos mediante RPC;
- lectura/mutación restringida a embarcaciones propias y recursos derivados;
- dashboard operativo básico.

Pendiente: creación completa de salidas, manifiesto, check-in y E2E operacional.

### Voucher

- token criptográfico generado con pgcrypto;
- verificación pública online;
- visibilidad autenticada restringida por reserva/ownership;
- cancelación deja de verificar como voucher válido.

Pendiente: QR visual, PDF operativo, redención, doble-uso, reemisión y offline.

## Riesgos y deuda abierta

- signup productivo debe ser invitation-only o equivalente;
- password policy/MFA productivos todavía no están cerrados;
- operador multiempresa continúa modelado indirectamente por `vessels.owner_id`;
- faltan holds, pagos, manifiesto de pasajeros y redención;
- faltan E2E negativos, operator/guide, cancelación/reprogramación y offline;
- faltan rutas/salidas CRUD completas;
- faltan PWA/offline/sync/outbox, observabilidad, reportes y runbook de deploy/rollback probado.

## R3 — Voucher operacional: integrado en `dev`

R3 quedó integrado en `dev` mediante el PR #8. La migración append-only añade estados `issued/redeemed/revoked/expired`, redención atómica con `FOR UPDATE`, `voucher_redemptions`, auditoría, QR visual, UI `/operator/redeem` y E2E de navegador para operador. La integración CI cubre autorización, ownership, cancelación, doble uso y concurrencia.

## Riesgo por área

| Área | Estado | Prioridad siguiente |
|---|---|---|
| Build reproducible | verde | mantenimiento |
| Auth/RLS/multitenancy | 18/18 integración | endurecimiento productivo |
| Booking engine | reserva/cancelación validadas | holds/pagos |
| Búsqueda disponibilidad | server-side antes de límite | optimización/índices si escala |
| Comisión | configurable por agencia | administración/edición |
| Admin agency/tour create | persistente y RLS validado | edición/eliminación/rutas |
| E2E browser | comercial y redención operacional **verde e integrado** | negativos adicionales |
| Voucher redemption | integrado y validado en CI | reemisión/offline |
| Offline | ausente | P1/P2 |

## Próximo frente recomendado

**O2/C3 — endurecimiento productivo y operación**.

Objetivo: cerrar pagos/conciliación, holds, operación de salidas, observabilidad y deploy/rollback probado sin degradar las garantías de R3.

## Criterio para cambiar a STABLE

Solo cuando existan: CI completo verde, lock reproducible, integración RLS positiva/negativa, E2E del flujo crítico verde, cero vulnerabilidades critical/high sin excepción aprobada, documentación sincronizada y un entorno de despliegue/rollback probado. R2 cierra una deuda P0 importante, pero **no cambia todavía `main` a STABLE**.
