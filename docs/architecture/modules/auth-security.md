# Auth y seguridad

**Código:** `src/lib/auth`, `src/lib/supabase/proxy.ts`, layouts protegidos y RLS.

## Estado S0

Roles operativos actuales: `admin`, `agency`, `operator`. Los guards server-side continúan siendo la primera barrera de navegación y RLS/RPC son la autoridad final sobre datos.

Reparaciones aplicadas:

- `getClaims()` se trata como nullable/error-prone en el proxy; no se desestructura `data` de forma insegura.
- El login resuelve home por rol y restringe `next` al área autorizada.
- `handle_new_user()` crea un perfil con `role_id = NULL`; ningún signup recibe `agency` u otro rol operativo automáticamente.
- `agencies_users`, `routes` y `tours` tienen RLS explícito.
- Un `operator` solo ve su propia flota y la disponibilidad, reservas y vouchers ligados a embarcaciones cuyo `owner_id = auth.uid()`.
- Los RPCs `cancel_reservation` y `update_availability_seats`, al ser `SECURITY DEFINER`, repiten explícitamente la validación de ownership y no dependen únicamente de RLS.

## Reglas no negociables

- Autorización real vive en servidor/RLS/RPC; la UI nunca es control de seguridad.
- `service_role` nunca llega al cliente.
- Signup B2B no asigna rol operativo automáticamente.
- Cambios de permisos requieren pruebas positivas y negativas.
- Todo RPC `SECURITY DEFINER` que mute o revele datos debe validar identidad, rol y ownership dentro de la función.
- No ampliar un rol globalmente cuando el dominio permite scope por organización/recurso.

## Deuda posterior a S0

- Modelar organización multiusuario de operadores en vez de depender únicamente de `vessels.owner_id`.
- Endurecer configuración productiva de signup/password/MFA.
- Añadir integración automatizada contra Supabase reseteado para demostrar policies y RPCs con usuarios de cada rol.
