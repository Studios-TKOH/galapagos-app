# Roadmap estratificado

Estimaciones en días de ingeniería efectiva para 1 desarrollador familiarizado con el stack; no son compromisos de calendario. Cada fase depende de la anterior salvo tareas explícitamente paralelas.

## Estado de avance — 2026-09-11

| Bloque | Estado | Resultado principal |
|---|---|---|
| S0 — Estabilización | **Integrado en `dev`** | build reproducible, auth/RLS endurecidos, CI base verde |
| R1 — Refactorización/seguridad funcional | **Integrado en `dev`** | 18/18 integración Supabase, búsqueda server-side, comisión y CRUD admin básico |
| R2 — Checkpoint E2E crítico | **Integrado en `dev`** | happy path agency validado en Chromium contra Supabase real |
| O2 — Optimización y escalabilidad | **Pendiente / parcialmente adelantado** | búsqueda server-side ya resuelta; quedan índices, observabilidad, idempotencia y rendimiento |
| C3 — Completitud productiva | **En progreso** | R3 voucher operacional integrado; pagos, offline y operación/reporting pendientes |

### Próximo frente operativo

**O2/C3 — endurecimiento productivo y operación**, después de integrar R3.

R3 ya está integrado en `dev` y validado por integración Supabase y Critical E2E. El objetivo inmediato es:

- holds con expiración e idempotencia;
- pagos y conciliación separados de reservas;
- creación completa de salidas y operación de manifiestos;
- observabilidad y runbook de deploy/rollback.

R3 no debe degradar RLS, ownership, booking engine ni el E2E comercial ya integrado.

## Fase S0 — Estabilización

**Estado:** completada e integrada en `dev`.  
**Estimación original:** 3–5 días.  
**Dependencia:** ninguna.  
**Objetivo:** recuperar build reproducible y cerrar riesgos críticos.

Entregables: corregir errores TypeScript; regenerar lockfile; `npm ci`; resolver high/critical advisories; redirect por rol; cerrar RLS/multitenancy crítico; seed reproducible; tests mínimos de auth/RLS/booking; CI verde.

**Éxito medible alcanzado:** `npm ci`, lint, typecheck, tests, build y audit policy pasan; los P0 iniciales quedaron cerrados.

## Fase R1 — Refactorización controlada

**Estado:** completada e integrada en `dev`.  
**Estimación original:** 5–8 días.  
**Dependencia:** S0.

Objetivos ejecutados: integración Supabase viva, hardening de roles/RLS/RPC, búsqueda server-side, comisión por agencia y eliminación de mocks administrativos críticos.

**Resultado:** 18/18 pruebas reales Auth/RLS/RPC/PostgREST y Production Check/Documentation Quality verdes.

La deuda de refactor estructural no queda agotada; extracción de acceso a datos, tipos Supabase generados, validación de env y reducción de casts siguen siendo mejoras válidas cuando no bloqueen frentes productivos prioritarios.

## Checkpoint R2 — E2E crítico

**Estado:** completado e integrado en `dev`.

R2 añadió el gate `Critical E2E` con Playwright/Chromium y Supabase efímero. Valida:

`login agency → membresía → búsqueda → reserva → voucher público → inventario actualizado`

Resultado validado: precio USD 40, comisión 20%, 10 cupos iniciales, reserva de dos pasajeros, total USD 80, comisión USD 16, voucher válido y 8 cupos finales.

Este checkpoint cerró la deuda P0 de ausencia de journey crítico de navegador.

## Fase O2 — Optimización y escalabilidad

**Estimación:** 4–7 días.  
**Dependencia:** R1.

Objetivos: índices, paginación, observabilidad, cache seguro, idempotencia e instrumentación de rendimiento.

Parte del alcance se adelantó durante R1: la búsqueda ya filtra en PostgreSQL antes del `LIMIT 50`.

**Éxito objetivo:** p95 acordado para rutas críticas; logs correlacionables; pruebas de concurrencia de último cupo; idempotencia en operaciones críticas.

**DoD:** métricas documentadas y no degradación de seguridad.

## Fase C3 — Completitud productiva

**Estimación:** 15–25 días, dividida en subfases.  
**Dependencia:** S0; preferible R1/O2.

### C3.1 Core comercial
- servicio unificado tour/ferry/transfer;
- salidas;
- hold con expiración;
- pasajeros individuales;
- comisión configurable — **parcialmente completada en R1**;
- trazabilidad de pagos.

### C3.2 Voucher operacional
- QR;
- PDF/enlace;
- redención/check-in;
- anti doble uso;
- scanner rol guía/staff.

**Prioridad actual:** completar los controles productivos alrededor del flujo comercial y operacional ya validado.

### C3.3 Offline-first
- PWA;
- IndexedDB;
- outbox/idempotencia;
- manifiesto/voucher cache;
- QR firmado y reconciliación de redenciones.

### C3.4 Operación y reporting
- manifiestos;
- export CSV/PDF;
- liquidaciones/reportes básicos;
- notificaciones email/WhatsApp API.

**Éxito:** journeys E2E de reserva→voucher→redención y offline scan pasan; producción readiness 100%.

## Regla de priorización

No iniciar una feature C3 que dependa de un P0 sin cerrar. Una pantalla nueva no compensa un build rojo, fuga RLS o inventario no confiable. Todo frente nuevo debe partir desde `dev`, trabajar en rama propia, ejecutar pruebas locales y abrir PR hacia `dev`; nunca debe escribirse directamente sobre `dev` o `main`.
