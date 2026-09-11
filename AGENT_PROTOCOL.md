# AGENT_PROTOCOL — Protocolo obligatorio para agentes de IA

## Objetivo

Hacer que una sesión de agente sea reproducible, auditable y compatible con el estado real del proyecto. Un agente no tiene autorización para “mejorar” arquitectura ignorando contratos existentes.

## Antes de cualquier edición

1. Leer `README.md`.
2. Leer `BASELINE.md`.
3. Leer `AI_CONTEXT.md`.
4. Leer `INDEX.md` y la documentación específica del módulo.
5. Inspeccionar archivos reales y migraciones relevantes.
6. Registrar un **Context Token** siguiendo `templates/AGENT_SESSION_LOG.md`.
7. Declarar supuestos; si un supuesto afecta seguridad, datos o compatibilidad, debe verificarse antes de editar.

## Context Token

Cada sesión que modifique código debe registrar, en `docs/agent-sessions/`, un bloque como:

```yaml
context_token: CTX-YYYYMMDD-HHMM-<agent>
base_ref: <commit>
docs_read:
  - BASELINE.md
  - AI_CONTEXT.md
  - docs/architecture/...
code_inspected:
  - src/...
assumptions:
  - "..."
risks:
  - "..."
planned_invariants:
  - "no reduce RLS coverage"
```

El token se incluye en la descripción del PR.

## Reglas durante la edición

- No romper tests existentes. Si un test deja de ser válido, explicar el cambio de contrato y reemplazarlo en el mismo PR.
- Mantener o mejorar cobertura una vez que exista baseline de coverage.
- No introducir `any`, bypass RLS, `service_role` cliente, cambios de schema destructivos o lógica crítica cliente sin justificación aprobada.
- Si cambia una interfaz, comportamiento, firma RPC, import cross-module o modelo de datos, actualizar documentación asociada.
- Decisiones de diseño deben citar la regla o documento que las respalda. Si la convención no cubre el caso, crear una decisión explícita antes de imponer un patrón nuevo.
- Cambios de seguridad y dinero requieren tests de integración.
- El agente debe preferir cambios mínimos y reversibles sobre reescrituras amplias.

## Validación previa al PR

Ejecutar como mínimo:

```bash
npm run docs:validate
npm run docs:health
npm run changelog:validate
npm run lint
npm run typecheck
npm run test --if-present
npm run build
```

Si algo falla por deuda preexistente, no ocultarlo. Registrar:

- comando;
- error exacto;
- si fue introducido por el cambio o ya existía;
- issue/fase que lo resolverá.

## Prohibiciones

Un agente jamás debe:

1. mergear directamente a `main`;
2. afirmar “producción lista” sin cumplir el gate documentado;
3. eliminar un test para poner CI verde sin reemplazo;
4. editar migraciones ya aplicadas para cambiar historia; crear nueva migración;
5. desactivar checks de seguridad;
6. modificar lockfiles manualmente;
7. inventar integraciones/credenciales/datos;
8. ocultar mocks tras copy productivo;
9. asumir que README está correcto sin contrastarlo con código;
10. dejar cambios de código sin registro de contexto y documentación cuando aplique.

## Fin de sesión

Actualizar el Context Token con:

```yaml
files_changed: []
commands_run: []
validation_results: []
remaining_risks: []
docs_updated: []
```

El objetivo es que otra persona pueda reconstruir por qué se tomó cada decisión sin acceder al razonamiento privado del agente.
