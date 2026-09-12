# Auth y seguridad

**Código:** `src/lib/auth`, `src/lib/supabase/proxy.ts`, layouts protegidos y RLS.

## Estado después de S0

Roles operativos actuales: `admin`, `agency`, `operator`. Los guards server-side son la primera barrera de navegación y RLS/RPC son la autoridad final sobre datos.

S0 quedó integrado en `dev` con CI post-merge verde: login por rol, `next` restringido, perfiles nuevos con `role_id = NULL`, RLS explícito y ownership de operador en flota/disponibilidad/reservas/vouchers.

## R1 — garantías runtime

R1 añade pruebas contra una instancia Supabase local reseteada, con usuarios reales de cada rol. El objetivo es demostrar el comportamiento de RLS/RPC, no solo inspeccionar SQL.

Hardening añadido:

- `guard_profile_role_change` bloquea cambios de `role_id` realizados por usuarios no admin; `service_role` queda reservado para bootstrap/control administrativo.
- `assign_user_role(UUID,TEXT)` es el flujo auditable de aprovisionamiento operacional para administradores.
- se elimina el `INSERT` directo autenticado sobre `reservations`; toda reserva debe pasar por `create_reservation` para conservar lock y decremento atómico de cupos.
- la suite de integración verifica aislamiento agencia A/B y operador A/B, intentos de escalación de rol, mutaciones cruzadas, visibilidad de vouchers y cancelación por ownership.

## Reglas no negociables

- Autorización real vive en servidor/RLS/RPC; la UI nunca es control de seguridad.
- `service_role` nunca llega al cliente.
- Signup B2B no asigna rol operativo automáticamente.
- Cambios de permisos requieren pruebas positivas y negativas.
- Todo RPC `SECURITY DEFINER` que mute o revele datos debe validar identidad, rol y ownership dentro de la función.
- No ampliar un rol globalmente cuando el dominio permite scope por organización/recurso.
- Las reservas no se insertan directamente desde Data API; se crean mediante RPC transaccional.

## Deuda posterior a R1

- Modelar organización multiusuario de operadores en vez de depender únicamente de `vessels.owner_id`.
- Endurecer configuración productiva de signup/password/MFA.
- Añadir E2E de navegador para login → búsqueda → reserva → voucher.
- Definir aprovisionamiento administrativo completo en UI sobre `assign_user_role`.
