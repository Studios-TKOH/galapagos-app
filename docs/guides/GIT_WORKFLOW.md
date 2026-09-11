# Flujo Git y control de cambios

## Ramas

- `main`: estado promovido para producción/release; nunca integración diaria.
- `dev`: integración continua y origen de nuevas ramas.
- `feature/<descripcion-corta>`: funcionalidad.
- `fix/<descripcion-corta>`: bug/corrección.
- `docs/<descripcion-corta>` puede usarse solo para cambios exclusivamente documentales.

## Flujo

```text
dev
 └─ feature/x o fix/x
       └─ PR → dev: CI + ≥1 review
                    ↓
                  dev
                    └─ PR de fase → main: CI + CODEOWNER @mikyy12
```

## Commits

Preferir Conventional Commits: `fix(auth): ...`, `feat(voucher): ...`, `docs(architecture): ...`, `refactor(booking): ...`, `chore(ci): ...`.

## Pull Requests

Todo PR usa `.github/PULL_REQUEST_TEMPLATE.md`. Cambios de código que afecten comportamiento requieren docs. Agentes incluyen Context Token.

## Promoción `dev → main`

Solo al cerrar un hito/fase. El PR debe contener resumen ejecutivo, issues cerrados, evidencia CI, riesgos residuales, rollback y confirmación de documentación actualizada.

No usar `main` como rama de respaldo de trabajo inconcluso.
