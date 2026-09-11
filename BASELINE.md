# BASELINE — Estado actual verificable

**Snapshot:** 2026-09-11  
**`dev` después de S0:** `c444066661db53a6ea80b43daaf728ee02c33d5a`  
**R1 validado en PR #5:** código `0e93a5fa9ecd159173f076b3d5c3d869d82cb940`  
**Clasificación de `main`:** **UNSTABLE / NO PRODUCCIÓN**

Este baseline distingue un `dev` recuperado de un producto listo para producción. S0 ya está integrado en `dev`; R1 está validado en la rama `feature/r1-integration-functional` y pendiente de revisión/merge. `main` sigue UNSTABLE porque aún faltan E2E crítico, despliegue/rollback probado y capacidades operativas P1.

## Resumen ejecutivo

R1 cerró el bloque de integración Supabase y varias deudas funcionales que S0 había dejado explícitas. El estado validado tiene los tres gates verdes:

| Gate | Evidencia R1 |
|---|---|
| Documentation Quality | **verde** |
| Production Check | **verde** |
| `npm ci` | **verde** |
| `npm audit` | **0 vulnerabilidades** |
| ESLint | **verde** |
| TypeScript | **verde** |
| Tests rápidos S0 | **7/7** |
| `next build` | **verde** |
| Supabase local + `db reset` | **verde** |
| Integración Auth/RLS/RPC/PostgREST | **18/18** |

La integración usa un stack Supabase efímero reconstruido desde migraciones + seed. No depende de claves ni datos del proyecto remoto.

## R1.1 — seguridad e integración: cerrado en rama

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
2. `gen_random_bytes()` no visible con `search_path = public`; el token ahora usa explícitamente `extensions.gen_random_bytes(24)`.

## R1.2 — funcionalidad inmediata: cerrado en rama

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
- voucher accesible por token.

Pendiente: hold con expiración, pago/conciliación, pasajeros individuales y E2E de navegador.

### Operator

- gestión de cupos mediante RPC;
- lectura/mutación restringida a embarcaciones propias y recursos derivados;
- dashboard operativo básico.

Pendiente: creación completa de salidas, manifiesto y check-in.

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
- falta E2E de navegador login → búsqueda → reserva → voucher;
- faltan holds, pagos, manifiesto de pasajeros y redención;
- faltan rutas/salidas CRUD completas;
- faltan PWA/offline/sync/outbox, observabilidad, reportes y runbook de deploy/rollback probado.

## Riesgo por área

| Área | Estado | Prioridad siguiente |
|---|---|---|
| Build reproducible | verde | mantenimiento |
| Auth/RLS/multitenancy | 18/18 integración | endurecimiento productivo |
| Booking engine | reserva/cancelación validadas | holds/pagos |
| Búsqueda disponibilidad | server-side antes de límite | optimización/índices si escala |
| Comisión | configurable por agencia | administración/edición |
| Admin agency/tour create | persistente y RLS validado | edición/eliminación/rutas |
| E2E browser | ausente | **P0 siguiente** |
| Voucher redemption | ausente | P1 |
| Offline | ausente | P1/P2 |

## Criterio para cambiar a STABLE

Solo cuando existan: CI completo verde, lock reproducible, integración RLS positiva/negativa, E2E del flujo crítico, cero vulnerabilidades critical/high sin excepción aprobada, documentación sincronizada y un entorno de despliegue/rollback probado. R1 mejora sustancialmente el baseline, pero **no cambia todavía `main` a STABLE**.
