# AI_CONTEXT — Contrato técnico del proyecto

Este documento es obligatorio para cualquier agente de IA y recomendado para toda persona que modifique el repositorio. Su propósito es evitar cambios plausibles pero incompatibles con la arquitectura real.

## 1. Objetivo del producto

Sistema B2B de vouchers digitales para turismo en Galápagos. El núcleo de negocio es **inventario → hold/reserva → confirmación/pago → voucher → redención**, con evolución offline-first para operación en conectividad intermitente.

## 2. Stack autorizado

- Next.js App Router + React + TypeScript estricto.
- Tailwind CSS para estilos existentes.
- Supabase Auth/SSR, PostgreSQL y RLS.
- Funciones PostgreSQL/RPC para operaciones transaccionales críticas.
- GitHub Actions para gates.

No introducir otro framework de frontend, ORM, base de datos o sistema de auth sin ADR/decisión explícita y migración aprobada.

## 3. Capas y responsabilidades

```text
src/app/              rutas y composición de páginas
src/components/       UI reutilizable por dominio
src/lib/auth/         autorización server-side
src/lib/supabase/     clientes Supabase y session proxy
supabase/migrations/  schema, RLS, RPC y evolución de datos
scripts/              validaciones del repositorio
/docs                  documentación autoritativa
```

### Regla crítica

La lógica que modifica cupos, reservas, pagos o redenciones debe ser atómica y autoritativa en servidor/PostgreSQL. El cliente nunca decide disponibilidad final.

## 4. Convenciones TypeScript

- `strict: true` se respeta; no silenciar con `any` salvo frontera externa justificada.
- Prohibido usar `as unknown as X` para ocultar incompatibilidades estructurales sin issue de seguimiento.
- Preferir tipos generados desde Supabase cuando estén disponibles.
- Toda función async debe modelar estados de error esperables.
- No usar `!` sobre variables de entorno fuera de un validador central.
- Hooks complejos y acceso a datos deben migrar gradualmente fuera de JSX hacia módulos de dominio/queries.

## 5. Convenciones de nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes React | PascalCase | `BookingModal.tsx` |
| Funciones/variables | camelCase | `createReservation` |
| RPC PostgreSQL | snake_case | `create_reservation` |
| Tablas | plural snake_case | `voucher_redemptions` |
| Ramas fix | `fix/<descripcion-corta>` | `fix/auth-role-redirect` |
| Ramas feature | `feature/<descripcion-corta>` | `feature/voucher-redemption` |
| Docs | UPPER_SNAKE para raíz; kebab-case en `/docs` | `BASELINE.md`, `offline-first.md` |

## 6. Estados de negocio recomendados

No inventar estados ad hoc desde UI. La dirección objetivo es:

```text
booking: DRAFT → HELD → PENDING_PAYMENT → CONFIRMED → COMPLETED
                                      ↘ CANCELLED
voucher: ISSUED → REDEEMED
            ↘ REVOKED / EXPIRED
```

Hasta que el schema migre, documentar cualquier diferencia explícitamente.

## 7. Seguridad obligatoria

- Toda tabla expuesta por Supabase Data API debe tener RLS o `GRANT` explícitamente justificado.
- Acceso operador/agencia debe filtrar por organización/recurso, no solo por nombre de rol.
- Secretos nunca usan prefijo `NEXT_PUBLIC_`.
- QR offline futuro usa firma asimétrica; la clave privada jamás llega al cliente.
- Signup B2B público no puede asignar rol operativo sin aprobación/invitación.
- PII mínima en QR, logs y caches offline.

## 8. UI/UX

- Preservar patrones actuales salvo decisión global.
- Mobile-first para operador/scanner.
- Estados loading/error/empty/disabled son obligatorios.
- No presentar botones sin implementación como funcionalidad terminada. Si aún no funciona: ocultar, deshabilitar con explicación o implementar.
- Mantener accesibilidad: labels, foco visible, controles nativos y targets táctiles suficientes.

## 9. Documentación obligatoria por cambio

- Cambio de firma RPC/schema/RLS → `docs/architecture/api-contracts.md`, `modules/data-layer.md`, `BASELINE.md` cuando cambie estado.
- Cambio de módulo/componente público → doc de módulo correspondiente.
- Cambio de arquitectura/imports entre áreas → `module-map.md`.
- Cambio de versión → `CHANGELOG.md`.
- Cambio de flujo operativo → README/guía correspondiente si afecta onboarding.

CI valida parte de estas relaciones automáticamente.

## 10. Anti-patrones prohibidos

1. `npm install` en CI para ocultar lockfile roto.
2. Desactivar TypeScript strict o ESLint para hacer pasar build.
3. `service_role` en navegador.
4. Desactivar RLS como solución temporal.
5. Mutar cupos con `.update()` cliente evitando RPC de concurrencia.
6. Hardcodear comisión, precios o permisos en componentes.
7. Confundir `reservation total` con `payment collected`.
8. Usar WhatsApp Web automatizado como integración productiva.
9. Introducir mocks con copy de “datos reales”.
10. Merge directo a `main`.
11. Reescribir el stack completo sin ADR y plan de migración.
12. Romper tests existentes sin explicar causa, reemplazo y riesgo.

## 11. Antes de editar

Leer en este orden: `README.md` → `BASELINE.md` → este archivo → doc del módulo → `AGENT_PROTOCOL.md` si eres agente. Después inspeccionar el código real. La documentación orienta; el código confirma.
