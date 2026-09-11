# Galápagos Digital Voucher Platform

<!-- PACKAGE_VERSION:0.1.0 -->
<!-- NEXT_VERSION:16.3.4 -->
<!-- REACT_VERSION:19.2.4 -->
<!-- PROJECT_STATUS:UNSTABLE -->

Plataforma B2B para gestionar disponibilidad, reservas y vouchers digitales de servicios turísticos en las Islas Galápagos. El objetivo del producto es conectar agencias de viaje, operadores turísticos y personal operativo con un flujo simple de inventario → reserva → voucher → validación/redención.

> **Estado actual:** `main` NO se considera producción estable. El build de producción falla y existen riesgos de seguridad/multitenancy documentados. El estado autoritativo está en [BASELINE.md](./BASELINE.md).

## Lectura obligatoria antes de modificar código

1. [INDEX.md](./INDEX.md) — mapa completo del sistema documental.
2. [BASELINE.md](./BASELINE.md) — estado real, deuda y riesgos conocidos.
3. [AI_CONTEXT.md](./AI_CONTEXT.md) — reglas técnicas obligatorias.
4. [AGENT_PROTOCOL.md](./AGENT_PROTOCOL.md) — protocolo para agentes de IA.
5. [Roadmap](./docs/roadmap/ROADMAP.md) — orden de rescate y evolución.

Una persona nueva debe poder completar la guía [Onboarding en 15 minutos](./docs/guides/ONBOARDING_15_MIN.md) antes de realizar cambios.

## Arquitectura de alto nivel

```mermaid
flowchart LR
  A[Admin Web] --> N[Next.js App Router]
  B[Agency Web] --> N
  C[Operator / Scanner PWA futuro] --> N
  N --> AUTH[Supabase Auth + RLS]
  N --> RPC[PostgreSQL RPC / Booking Engine]
  RPC --> DB[(PostgreSQL)]
  N --> VERIFY[Public Voucher Verification]
  OFF[IndexedDB + Outbox futuro] -. sync .-> N
```

Detalles: [docs/architecture/system-overview.md](./docs/architecture/system-overview.md).

## Stack detectado

- Next.js 16.3.4, App Router y Turbopack.
- React 19.2.4 + TypeScript 5 en modo `strict`.
- Tailwind CSS 4.
- Supabase SSR / Supabase JS.
- PostgreSQL + RLS + funciones RPC mediante migraciones Supabase.
- GitHub Actions para gates de calidad.

## Rutas actuales

| Área | Ruta | Estado |
|---|---|---|
| Login | `/` | Funcional con bug de redirect por rol |
| Admin | `/admin` | Parcial |
| Agencias | `/agency` | Búsqueda/reserva parcial |
| Reservas agencia | `/agency/reservations` | Funcional parcial |
| Operador | `/operator` | Parcial |
| Cupos | `/operator/availability` | Funcional parcial |
| Voucher público | `/verify/[token]` | Validación online; no redención |

## Inicio rápido

```bash
npm ci
cp .env.example .env.local
# Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
supabase start
supabase db reset
npm run dev
```

**Nota:** en el baseline actual `npm ci` puede fallar porque `package-lock.json` está desincronizado con `package.json`. Esto es un P0 deliberadamente visible, no debe ocultarse usando `npm install` como workaround permanente.

## Comandos de calidad

```bash
npm run lint
npm run typecheck
npm run docs:validate
npm run docs:health
npm run changelog:validate
npm run build
```

CI debe ser verde antes de mergear a `dev`. `main` requiere además revisión del CODEOWNER y gate de producción.

## Flujo Git

```text
feature/* o fix/*
      ↓ PR + CI + review
dev
      ↓ PR de fase + revisión explícita
main
```

Ver [docs/guides/GIT_WORKFLOW.md](./docs/guides/GIT_WORKFLOW.md).

## Principios no negociables

- No bypass de RLS para resolver problemas de permisos.
- No lógica crítica de inventario en el cliente.
- No cambios directos a `main`.
- No mocks presentados como funcionalidad productiva.
- No merge con build rojo.
- No cambio de contratos, roles, tablas o comportamiento público sin documentación asociada.
- No automatización productiva de WhatsApp Web; usar APIs autorizadas.

## Estado de producción

Los criterios completos están en [PRODUCTION_READINESS.md](./docs/guides/PRODUCTION_READINESS.md). Hasta que todos estén en verde, este repositorio debe tratarse como **producto en estabilización**.
