# Capa de datos

**Código:** `src/lib/supabase`, `supabase/migrations`.

PostgreSQL/Supabase es la fuente de verdad. Las migraciones son append-only: no editar una migración histórica ya aplicada para cambiar comportamiento; crear una nueva.

## Estado después de S0

- `package-lock.json` es reproducible y CI usa `npm ci` como instalación autoritativa.
- `supabase/seed.sql` es deliberadamente mínimo para resets reproducibles sin introducir datos productivos falsos.
- `20260911051000_s0_security_stabilization.sql` completa RLS explícito para `agencies_users`, `routes` y `tours` y restringe recursos operativos por ownership.
- `cancel_reservation` y `update_availability_seats` validan ownership dentro del propio `SECURITY DEFINER`.
- El CI post-merge de S0 en `dev` pasó instalación, audit, lint, typecheck, tests y build.

## R1 — integración real

La migración `20260911054000_r1_integration_hardening.sql` añade:

- guard de cambios de `profiles.role_id` para impedir escalación de privilegios por autoedición;
- RPC auditable `assign_user_role(UUID,TEXT)` reservado a admin;
- eliminación de la policy de `INSERT` directo en `reservations`, obligando a usar `create_reservation`.

La migración `20260911060000_r1_search_commission.sql` añade:

- `agencies.commission_rate` con rango 0..1 y valor por defecto 0.15;
- RPC `search_availability(DATE,TEXT,INT)` como `SECURITY INVOKER`, filtrando en PostgreSQL antes de `LIMIT 50` y manteniendo RLS del caller;
- cálculo de comisión dentro de `create_reservation` a partir de la agencia, eliminando la tasa fija del motor.

`.github/workflows/supabase-integration.yml` levanta Supabase local mediante CLI fijado a `2.117.0`, aplica migraciones/seed con reset y ejecuta `tests/integration/*.test.mjs` usando claves locales efímeras. No requiere secretos ni acceso al proyecto Supabase remoto.

La suite crea fixtures en runtime para admin, agencia A/B y operador A/B y prueba casos positivos/negativos de RLS, RPC y ownership. Una segunda batería crea más de 50 salidas no coincidentes para demostrar que el filtro del buscador ocurre antes del límite y valida que una comisión distinta del 15% se calcule y persista en PostgreSQL. Los fixtures no se almacenan en `seed.sql` y desaparecen al destruir el stack de CI.

## Invariantes

Todo nuevo objeto público debe definir:

- RLS/GRANT explícitos;
- índices relevantes;
- estrategia de auditoría;
- ownership/tenant scope;
- test de integración positivo y negativo cuando afecte permisos;
- contrato RPC documentado si se otorga `EXECUTE`.

No confiar en RLS como única protección dentro de una función `SECURITY DEFINER`: la función debe comprobar identidad, rol y scope por sí misma. Usar `SECURITY INVOKER` cuando la función solo encapsula lecturas que deben conservar las policies RLS del caller.
