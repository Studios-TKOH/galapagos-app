# Módulo Agency

**Código:** `src/app/agency`, `src/components/agency`.

Responsabilidad: consultar disponibilidad, reservar, consultar/cancelar reservas y acceder al voucher.

## Estado S0

La reserva continúa usando `create_reservation` de forma transaccional. Se corrigió la regresión TypeScript de `BookingModal`: después del guard de nulabilidad se captura `selectedTour`, de modo que el closure async no vuelve a tratar `tour` como potencialmente `null`.

El número de pasajeros usado para buscar disponibilidad ahora se pasa como `initialPassengers` al modal. El modal solo se monta cuando existe una salida seleccionada y usa una `key` por disponibilidad, por lo que al cerrarlo se descartan nombre, documento, éxito/errores y cantidad modificada; una nueva reserva comienza desde el estado de búsqueda actual sin arrastrar datos de la anterior.

La autorización de cancelación también fue endurecida en PostgreSQL: una agencia solo puede cancelar una reserva creada por su usuario y perteneciente a una agencia a la que el usuario continúa vinculado; un operador solo puede cancelar reservas de su propia flota.

## Deuda funcional restante

- el filtro textual de destino ocurre después del `LIMIT 50` y debe moverse a servidor;
- comisión fija 15% sigue hardcodeada;
- falta hold con expiración, pago y pasajeros individuales;
- falta redención operacional del voucher.

## Invariantes

- una agencia solo accede a organizaciones a las que pertenece;
- inventario final lo decide RPC transaccional;
- la cantidad inicial del modal debe representar la cantidad solicitada en la búsqueda y nunca superar `availableSeats`;
- cerrar un modal de reserva debe descartar PII y estado transitorio local;
- UI no inventa cupos ni pagos;
- una corrección visual no debe debilitar validaciones de reserva ni autorización.
