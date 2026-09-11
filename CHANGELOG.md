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
- Gate `Supabase Integration` con stack local efímero, migraciones + seed y pruebas Auth/RLS/RPC/PostgREST sin secretos remotos.
- 18 pruebas de integración R1 para aislamiento multi-tenant, ownership, motor de reservas, búsqueda, comisión y permisos de alta administrativa.
- RPC `assign_user_role(UUID,TEXT)` para aprovisionamiento administrativo auditable.
- RPC `search_availability(DATE,TEXT,INT)` con filtrado server-side antes de `LIMIT 50`.
- `agencies.commission_rate` como configuración de comisión por agencia.
- Alta persistente de agencias y tours desde el área admin.
- Gate `Critical E2E` con Chromium para login agency → búsqueda → reserva → voucher público → verificación de decremento de inventario.
- Fixture E2E determinista sobre Supabase local sin mocks del motor de negocio.

### Fixed
- Sincronización reproducible de `package-lock.json` con Supabase, Next.js 16.3.4 y `eslint-config-next` 16.3.4.
- Nullability de `BookingModal` dentro del flujo async de reservas.
- Manejo seguro de `getClaims()` en el proxy de sesión.
- Redirección post-login resuelta por rol y `next` restringido al portal autorizado.
- Usuarios nuevos dejan de recibir un rol operativo automáticamente.
- RLS explícito añadido a `agencies_users`, `routes` y `tours`.
- Acceso de operador a embarcaciones, disponibilidad, reservas y vouchers restringido por ownership.
- RPCs `cancel_reservation` y `update_availability_seats` endurecidos con validación explícita de ownership bajo `SECURITY DEFINER`.
- Autoescalación de `profiles.role_id` bloqueada para usuarios no admin.
- `INSERT` directo autenticado en `reservations` eliminado para impedir bypass del lock/decremento transaccional.
- Ambigüedad PL/pgSQL de `available_seats` dentro de `create_reservation` corregida.
- Generación de token de voucher corregida para usar `extensions.gen_random_bytes(24)` con `search_path` endurecido.
- Filtro textual de disponibilidad movido del cliente a PostgreSQL para no perder coincidencias fuera de los primeros 50 registros.
- Comisión fija de 15% eliminada del motor/UI y sustituida por tasa persistida por agencia.
- Selección arbitraria de la primera membresía de agencia eliminada; el contexto es explícito cuando existen múltiples agencias.
- Formularios de agencia/tour dejan de simular éxito: persisten y reflejan el registro confirmado por PostgreSQL.

### Changed
- CI definido como gate reproducible con `npm ci`, typecheck, auditoría de dependencias, tests, build y documentación.
- El script `test` pasa a ser obligatorio dentro del gate de calidad.
- Acciones de checkout/setup-node actualizadas a generaciones con runtime moderno.
- Campos administrativos sin representación real en el modelo fueron retirados de los formularios para no descartar datos silenciosamente.
- `Production Check`, `Documentation Quality` y `Critical E2E` cancelan ejecuciones obsoletas por PR/ref para reducir consumo de GitHub Actions.
- Playwright del gate E2E se instala de forma transitoria con versión fijada, sin alterar el lockfile principal.
- R2 quedó integrado en `dev` después de validar en navegador real el flujo comercial crítico completo.
- El stack Supabase del gate E2E excluye servicios no utilizados para reducir tiempo y consumo de GitHub Actions.

### Known issues
- `main` continúa clasificado como UNSTABLE aunque **S0, R1 y R2 ya están integrados en `dev`**.
- Permanecen pendientes: E2E negativos/operator, QR/redención, pagos/conciliación, holds, manifiesto/check-in, rutas/salidas CRUD completas, offline-first, observabilidad y deploy/rollback probado.
- El siguiente frente recomendado es R3: voucher operacional y redención segura.

## [0.1.0] - 2026-09-10

### Existing baseline
- UI inicial para admin, agencias y operadores.
- Supabase Auth/SSR, RLS parcial y motor RPC de reservas.
- Verificación pública de vouchers mediante token.
