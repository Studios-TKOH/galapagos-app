# Sistema de auto-evaluación documentación↔código

## Componentes

### `scripts/docs-health.mjs`
Descubre módulos reales, compara con marcadores `MODULE`, valida docs existentes, calcula cobertura/frescura/completitud.

### `scripts/validate-doc-sync.mjs`
Valida:
- versiones README vs `package.json`;
- funciones con `GRANT EXECUTE` vs marcadores `API_CONTRACT`;
- imports cross-module vs `ARCH_DEP`;
- en PR, módulo de código modificado → doc asociada modificada.

### `scripts/validate-changelog.mjs`
Verifica que versión actual exista en changelog y que un bump de versión en PR actualice changelog.

## CI

`documentation-quality.yml` corre estos checks sin depender de instalar paquetes. `production-check.yml` agrega instalación reproducible, audit, lint, typecheck, tests y build.

## Fallos intencionales

El sistema debe fallar cuando detecta divergencia. No suavizar reglas para poner CI verde; corregir el contrato o el código.
