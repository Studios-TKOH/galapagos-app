# Sistema de auto-evaluación documentación↔código

## Componentes

### `scripts/docs-health.mjs`
Descubre módulos reales, compara con marcadores `MODULE`, valida docs existentes, calcula cobertura/frescura/completitud.

### `scripts/validate-doc-sync.mjs`
Valida:
- versiones README vs `package.json`;
- `PROJECT_STATUS` del README vs clasificación `STABLE/UNSTABLE` de `BASELINE.md`;
- funciones con `GRANT EXECUTE` vs marcadores `API_CONTRACT`;
- imports cross-module vs `ARCH_DEP`;
- en PR, módulo de código modificado → doc asociada modificada;
- migraciones y cambios de dependencias requieren documentación relacionada.

### `scripts/validate-changelog.mjs`
Verifica que versión actual exista en changelog y que un bump de versión en PR actualice changelog.

## CI

`documentation-quality.yml` corre estos checks sin depender de instalar paquetes. `production-check.yml` agrega instalación reproducible, audit, lint, typecheck, tests y build.

## Baseline validado

En el bootstrap del sistema los checks documentales pasaron con 100/100, 12/12 módulos, 5 contratos RPC y 16 dependencias arquitectónicas. El gate productivo detectó correctamente el lockfile desincronizado mediante `npm ci`.

## Fallos intencionales

El sistema debe fallar cuando detecta divergencia. No suavizar reglas para poner CI verde; corregir el contrato o el código.
