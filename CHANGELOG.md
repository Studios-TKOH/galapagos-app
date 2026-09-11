# Changelog

Todos los cambios relevantes del proyecto se registran aquí. Formato inspirado en Keep a Changelog; el versionado actual sigue `package.json` hasta adoptar una política SemVer formal de releases.

## [Unreleased]

### Added
- Sistema fundacional de documentación y gobierno técnico.
- Validación automática docs↔código, contratos RPC, arquitectura y salud documental.
- Estrategia `feature/fix → dev → main`, CODEOWNERS y plantillas de PR.
- Protocolo auditable para agentes de IA mediante Context Tokens.
- Tests S0 con `node:test` para routing seguro y contratos de seguridad/RLS.
- `supabase/seed.sql` mínimo y determinista para que `supabase db reset` tenga un entrypoint válido.

### Fixed
- Sincronización reproducible de `package-lock.json` con Supabase, Next.js 16.3.4 y `eslint-config-next` 16.3.4.
- Nullability de `BookingModal` dentro del flujo async de reservas.
- Manejo seguro de `getClaims()` en el proxy de sesión.
- Redirección post-login resuelta por rol y `next` restringido al portal autorizado.
- Usuarios nuevos dejan de recibir un rol operativo automáticamente.
- RLS explícito añadido a `agencies_users`, `routes` y `tours`.
- Acceso de operador a embarcaciones, disponibilidad, reservas y vouchers restringido por ownership.
- RPCs `cancel_reservation` y `update_availability_seats` endurecidos con validación explícita de ownership bajo `SECURITY DEFINER`.

### Changed
- CI definido como gate reproducible con `npm ci`, typecheck, auditoría de dependencias, tests y documentación.
- El script `test` pasa a ser obligatorio dentro del gate de calidad.

### Known issues
- `main` continúa clasificado como UNSTABLE hasta que S0 sea validado y promovido.
- Permanecen fuera de S0: QR/redención, pagos, offline-first, CRUD administrativo incompleto y cobertura E2E del flujo completo.

## [0.1.0] - 2026-09-10

### Existing baseline
- UI inicial para admin, agencias y operadores.
- Supabase Auth/SSR, RLS parcial y motor RPC de reservas.
- Verificación pública de vouchers mediante token.
