# Production Readiness Gate

Un release se considera **completo de producción** solo cuando todos los puntos están verificados.

## Calidad

- [ ] `npm ci` reproducible.
- [ ] lint verde sin warnings críticos.
- [ ] typecheck verde.
- [ ] build verde.
- [ ] tests unit/integration/E2E críticos verdes.
- [ ] coverage no inferior a baseline acordado.

## Seguridad

- [ ] cero vulnerabilidades critical/high sin excepción aprobada con fecha de vencimiento.
- [ ] RLS probado en todas las tablas expuestas.
- [ ] multitenancy por organización probado.
- [ ] secrets fuera de cliente/repo.
- [ ] signup/roles productivos controlados.

## Producto

- [ ] inventario/reserva transaccional e idempotente.
- [ ] voucher emitible/verificable/redimible.
- [ ] pagos diferenciados de reservas.
- [ ] cancelación/reprogramación consistente.
- [ ] journeys de roles principales E2E.

## Operaciones

- [ ] logs/errores básicos configurados.
- [ ] backup/restore probado.
- [ ] deploy y rollback verificados.
- [ ] smoke test documentado.

## Documentación

- [ ] salud documental 100% de cobertura.
- [ ] API contracts sincronizados.
- [ ] module map sincronizado.
- [ ] README refleja stack/estado.
- [ ] BASELINE actualizado al commit de release.
- [ ] CHANGELOG actualizado.

## Cierre de fase

Cuando todos los issues de una fase están cerrados: PR `dev → main`, resumen ejecutivo, evidencia de gates, riesgos residuales, rollback y revisión explícita de `@mikyy12`. No mergear por “fecha objetivo” si falta un gate.
