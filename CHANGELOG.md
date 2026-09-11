# Changelog

Todos los cambios relevantes del proyecto se registran aquí. Formato inspirado en Keep a Changelog; el versionado actual sigue `package.json` hasta adoptar una política SemVer formal de releases.

## [Unreleased]

### Added
- Sistema fundacional de documentación y gobierno técnico.
- Validación automática docs↔código, contratos RPC, arquitectura y salud documental.
- Estrategia `feature/fix → dev → main`, CODEOWNERS y plantillas de PR.
- Protocolo auditable para agentes de IA mediante Context Tokens.

### Changed
- CI definido como gate reproducible con `npm ci`, typecheck, auditoría de dependencias y documentación.

### Known issues
- El baseline actual continúa con build TypeScript roto y lockfile desincronizado; estos P0 no se ocultan en esta fase documental.

## [0.1.0] - 2026-09-10

### Existing baseline
- UI inicial para admin, agencias y operadores.
- Supabase Auth/SSR, RLS parcial y motor RPC de reservas.
- Verificación pública de vouchers mediante token.
