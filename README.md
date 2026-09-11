# Galápagos Digital Voucher Platform

<!-- PACKAGE_VERSION:0.1.0 -->
<!-- NEXT_VERSION:16.3.4 -->
<!-- REACT_VERSION:19.2.4 -->
<!-- PROJECT_STATUS:UNSTABLE -->

Plataforma B2B para gestionar disponibilidad, reservas y vouchers digitales de servicios turísticos en las Islas Galápagos. El objetivo del producto es conectar agencias de viaje, operadores turísticos y personal operativo con un flujo simple de inventario → reserva → voucher → validación/redención.

> **Estado actual:** `dev` ya incorporó S0 y tiene CI post-merge verde. `main` todavía NO se considera producción estable porque faltan pruebas de integración/E2E y capacidades operativas P1. El estado autoritativo está en [BASELINE.md](./BASELINE.md).

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
- GitHub Actions para gates de documentación, producción e integración Supabase.

## Rutas actuales

| Área | Ruta | Estado |
|---|---|---|
| Login | `/` | Funcional; redirect y `next` protegidos por rol |
| Admin | `/admin` | Parcial |
| Agencias | `/agency` | Búsqueda/reserva funcional con deuda de filtro server-side |
| Reservas agencia | `/agency/reservations` | Funcional parcial |
| Operador | `/operator` | Parcial; ownership de flota aplicado |
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

El lockfile está sincronizado y `npm ci` es la instalación autoritativa. No usar `npm install` para ocultar drift entre `package.json` y `package-lock.json`.

## Comandos de calidad

```bash
npm run lint
npm run typecheck
npm test
npm run docs:validate
npm run docs:health
npm run changelog:validate
npm run build
```

Para pruebas RLS/RPC reales, con un Supabase local levantado y las credenciales locales exportadas:

```bash
npm run test:integration
```

El workflow `Supabase Integration` automatiza ese proceso en PRs relevantes contra `dev`/`main` usando un stack local efímero; no usa secretos del proyecto remoto.

CI debe ser verde antes de mergear a `dev`. `main` requiere además revisión y gate de producción.

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
- Reservas productivas deben pasar por el motor RPC transaccional, no por inserts directos.
- No automatización productiva de WhatsApp Web; usar APIs autorizadas.

## Estado de producción

Los criterios completos están en [PRODUCTION_READINESS.md](./docs/guides/PRODUCTION_READINESS.md). Hasta que integración RLS, E2E crítico, despliegue/rollback y capacidades P1 estén validados, este repositorio debe tratarse como **producto en estabilización**.
