# Módulo Agency

**Código:** `src/app/agency`, `src/components/agency`.

Responsabilidad: consultar disponibilidad, reservar, consultar/cancelar reservas y acceder al voucher.

## Estado S0

La reserva continúa usando `create_reservation` de forma transaccional. Se corrigió la regresión TypeScript de `BookingModal`: después del guard de nulabilidad se captura `selectedTour`, de modo que el closure async no vuelve a tratar `tour` como potencialmente `null`.

La autorización de cancelación también fue endurecida en PostgreSQL: una agencia solo puede cancelar una reserva creada por su usuario y perteneciente a una agencia a la que el usuario continúa vinculado; un operador solo puede cancelar reservas de su propia flota.

## Deuda funcional restante

- el número de pasajeros seleccionado en el buscador todavía debe transferirse al modal de reserva;
- el filtro textual de destino ocurre después del `LIMIT 50` y debe moverse a servidor;
- comisión fija 15% sigue hardcodeada;
- falta hold con expiración, pago y pasajeros individuales;
- falta redención operacional del voucher.

## Invariantes

- una agencia solo accede a organizaciones a las que pertenece;
- inventario final lo decide RPC transaccional;
- UI no inventa cupos ni pagos;
- una corrección visual no debe debilitar validaciones de reserva ni autorización.
