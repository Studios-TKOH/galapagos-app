# Protección de ramas

Las reglas siguientes deben configurarse en GitHub Rulesets/Branch Protection. El repositorio incluye CODEOWNERS, pero CODEOWNERS por sí solo no activa enforcement.

## `dev`

- Require pull request before merging: ON.
- Required approvals: 1.
- Dismiss stale approvals: ON.
- Require conversation resolution: ON.
- Require status checks: `Documentation Quality`, `Production Check`.
- Require branches up to date: ON.
- Block force pushes/deletions: ON.
- Direct push: restringido a mantenedores solo para emergencia documentada.

## `main`

- Require pull request: ON.
- Required approvals: mínimo 1.
- Require review from Code Owners: ON.
- CODEOWNER global: `@LavenderEdit`.
- Require status checks: documentación + producción.
- Require conversation resolution: ON.
- Require up-to-date branch: ON.
- Force push/deletion: OFF/prohibido.
- Bypass: ninguno salvo owner de emergencia con postmortem.

## Limitación de automatización

La integración utilizada para instalar este sistema puede escribir archivos/ramas/PRs pero no expone mutación de Branch Protection/Rulesets. Por ello estas reglas deben activarse una vez desde Settings → Rules → Rulesets/Branches. La documentación y CODEOWNERS ya quedan preparadas.
