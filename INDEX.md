# Índice maestro de documentación

Este archivo es el punto de entrada del sistema documental. Orden recomendado de lectura: 10–15 minutos para contexto mínimo, luego documentación específica de la tarea.

## Ruta rápida — 15 minutos

1. `README.md` — 2 min: propósito, stack y estado.
2. `BASELINE.md` — 4 min: qué está roto y qué sí funciona.
3. `AI_CONTEXT.md` — 4 min: reglas obligatorias y anti-patrones.
4. `docs/roadmap/ROADMAP.md` — 3 min: qué se arregla primero.
5. `docs/guides/GIT_WORKFLOW.md` — 2 min: cómo contribuir.

## Fundacional

- [README.md](./README.md) — puerta de entrada.
- [BASELINE.md](./BASELINE.md) — snapshot técnico verificable.
- [AI_CONTEXT.md](./AI_CONTEXT.md) — contrato de arquitectura/código.
- [AGENT_PROTOCOL.md](./AGENT_PROTOCOL.md) — reglas para agentes de IA.
- [CHANGELOG.md](./CHANGELOG.md) — cambios versionados.

## Arquitectura

- [Visión general](./docs/architecture/system-overview.md)
- [Mapa de módulos y dependencias](./docs/architecture/module-map.md)
- [Contratos RPC/API](./docs/architecture/api-contracts.md)
- [Arquitectura offline-first](./docs/architecture/offline-first.md)
- [Admin](./docs/architecture/modules/admin.md)
- [Agency](./docs/architecture/modules/agency.md)
- [Operator](./docs/architecture/modules/operator.md)
- [Voucher](./docs/architecture/modules/voucher.md)
- [Auth y seguridad](./docs/architecture/modules/auth-security.md)
- [Capa de datos](./docs/architecture/modules/data-layer.md)
- [Entrada pública](./docs/architecture/modules/public-entry.md)

## Roadmap

- [Roadmap por fases](./docs/roadmap/ROADMAP.md)
- [Hitos y Gantt simplificado](./docs/roadmap/MILESTONES.md)

## Guías

- [Onboarding 15 min](./docs/guides/ONBOARDING_15_MIN.md)
- [Desarrollo](./docs/guides/DEVELOPMENT.md)
- [Git y ramas](./docs/guides/GIT_WORKFLOW.md)
- [Testing](./docs/guides/TESTING.md)
- [Deploy](./docs/guides/DEPLOYMENT.md)
- [Estándares documentales](./docs/guides/DOCUMENTATION_STANDARDS.md)
- [Production readiness](./docs/guides/PRODUCTION_READINESS.md)

## CI y gobierno

- [Auto-evaluación docs↔código](./docs/ci-config/AUTO_EVALUATION.md)
- [Salud documental](./docs/ci-config/DOCUMENT_HEALTH.md)
- [Protección de ramas](./docs/ci-config/BRANCH_PROTECTION.md)

## Plantillas

- [Pull Request](./templates/PULL_REQUEST_TEMPLATE.md)
- [Registro de sesión de agente](./templates/AGENT_SESSION_LOG.md)
- [Sesiones de agentes](./docs/agent-sessions/README.md)

## Orden de autoridad

Si dos documentos entran en conflicto, prevalece este orden:

1. Código + migraciones ejecutables en la rama objetivo.
2. `BASELINE.md` para estado actual.
3. `AI_CONTEXT.md` para convenciones obligatorias.
4. Documentos de arquitectura.
5. Roadmap.
6. README/guías.

Una contradicción entre documentación y código es un defecto que debe corregirse en el mismo PR.
