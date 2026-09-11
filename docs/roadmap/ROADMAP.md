# Roadmap estratificado

Estimaciones en días de ingeniería efectiva para 1 desarrollador familiarizado con el stack; no son compromisos de calendario. Cada fase depende de la anterior salvo tareas explícitamente paralelas.

## Fase S0 — Estabilización

**Estimación:** 3–5 días.  
**Dependencia:** ninguna.  
**Objetivo:** recuperar build reproducible y cerrar riesgos críticos.

Entregables: corregir 2 errores TypeScript; regenerar lockfile; `npm ci`; resolver high/critical advisories; redirect por rol; cerrar RLS/multitenancy crítico; seed reproducible; tests mínimos de auth/RLS/booking; CI verde.

**Éxito medible:** `npm ci`, lint, typecheck, tests, build y audit policy pasan; cero P0 abiertos.

**DoD:** PR `dev → main` con baseline actualizado y aprobación CODEOWNER.

## Fase R1 — Refactorización controlada

**Estimación:** 5–8 días.  
**Dependencia:** S0.

Objetivos: extraer acceso a datos/lógica de JSX, tipos generados Supabase, validación de env, eliminar casts inseguros, unificar manejo de errores y limpiar mocks productivos.

**Éxito:** ningún bypass de tipos nuevo; cobertura de tests ≥ baseline y objetivo inicial 50% en dominio crítico; formularios admin funcionales o explícitamente deshabilitados.

**DoD:** arquitectura/documentación sincronizada y cero regresiones E2E críticas.

## Fase O2 — Optimización y escalabilidad

**Estimación:** 4–7 días.  
**Dependencia:** R1.

Objetivos: queries server-side correctas, índices, paginación, observabilidad, cache seguro, idempotencia e instrumentación de rendimiento.

**Éxito:** búsquedas no filtran después de límites; p95 acordado para rutas críticas; logs correlacionables; pruebas de concurrencia de último cupo.

**DoD:** métricas documentadas y no degradación de seguridad.

## Fase C3 — Completitud productiva

**Estimación:** 15–25 días, dividida en subfases.  
**Dependencia:** S0; preferible R1/O2.

### C3.1 Core comercial
- servicio unificado tour/ferry/transfer;
- salidas;
- hold con expiración;
- pasajeros individuales;
- comisión configurable;
- trazabilidad de pagos.

### C3.2 Voucher operacional
- QR;
- PDF/enlace;
- redención/check-in;
- anti doble uso;
- scanner rol guía/staff.

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

No iniciar una feature C3 que dependa de un P0 sin cerrar. Una pantalla nueva no compensa un build rojo, fuga RLS o inventario no confiable.
