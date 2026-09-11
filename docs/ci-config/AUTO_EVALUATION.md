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

El build de CI define valores placeholder **no secretos** para `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Su único propósito es permitir que Next.js construya/prerenderice componentes que instancian el cliente browser. No representan una instancia real, no habilitan llamadas de producción y no sustituyen la configuración runtime documentada para cada entorno.

## Baseline validado

Durante S0 los checks documentales alcanzan 100/100, 12/12 módulos y 5 contratos RPC; el mapa actual declara 17 dependencias arquitectónicas. El gate productivo detectó primero el lockfile desincronizado y, tras repararlo, verificó `npm ci` y `npm audit` con 0 vulnerabilidades antes de avanzar a lint/typecheck/tests/build.

## Fallos intencionales

El sistema debe fallar cuando detecta divergencia. No suavizar reglas para poner CI verde; corregir el contrato o el código. Los placeholders de build son aceptables porque las variables son públicas y no otorgan acceso a un backend real; nunca introducir secretos reales en workflows versionados.
