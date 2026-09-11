# Capa de datos

**Código:** `src/lib/supabase`, `supabase/migrations`.

PostgreSQL/Supabase es la fuente de verdad. Las migraciones son append-only: no editar una migración histórica ya aplicada para cambiar comportamiento; crear una nueva.

## Estado S0

- `package-lock.json` fue regenerado en runner limpio y ya representa las dependencias declaradas en `package.json`; CI mantiene `npm ci` como instalación autoritativa.
- Existe `supabase/seed.sql`, deliberadamente mínimo, para satisfacer el reset reproducible sin introducir datos productivos falsos.
- La migración `20260911051000_s0_security_stabilization.sql` completa RLS explícito para `agencies_users`, `routes` y `tours` y restringe recursos operativos por ownership.
- `cancel_reservation` y `update_availability_seats` conservan sus firmas públicas pero incorporan checks de ownership internos adecuados para `SECURITY DEFINER`.

## Invariantes

Todo nuevo objeto público debe definir:

- RLS/GRANT explícitos;
- índices relevantes;
- estrategia de auditoría;
- ownership/tenant scope;
- test de integración positivo y negativo cuando afecte permisos;
- contrato RPC documentado si se otorga `EXECUTE`.

No confiar en RLS como única protección dentro de una función `SECURITY DEFINER`: la función debe comprobar identidad, rol y scope por sí misma.
