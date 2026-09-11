# Hitos y Gantt simplificado

Escenario de referencia: un desarrollador principal, seis semanas. Ajustar por capacidad real.

| Semana | S0 Estabilización | R1 Refactor | O2 Optimización | C3 Completitud |
|---|---|---|---|---|
| 1 | █████ |  |  |  |
| 2 | ██ cierre | ███ |  |  |
| 3 |  | ███ cierre | ██ |  |
| 4 |  |  | ███ cierre | ██ Core |
| 5 |  |  |  | █████ Voucher/Offline |
| 6 |  |  |  | █████ Reportes/Prod gate |

## Gates

- **M0:** CI reproducible verde y seguridad P0 cerrada.
- **M1:** deuda estructural principal bajo control y tests de dominio.
- **M2:** performance/observabilidad/idempotencia medidos.
- **M3:** MVP operacional end-to-end.
- **M4:** offline-first validado en modo avión/2 dispositivos.
- **M5:** production readiness aprobado.

Cada gate termina con PR `dev → main`; no se promociona una fase porque “ya se trabajó”, sino porque cumple DoD medible.
