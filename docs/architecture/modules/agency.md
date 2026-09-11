# Módulo Agency

**Código:** `src/app/agency`, `src/components/agency`.

Responsabilidad: consultar disponibilidad, operar bajo una agencia explícita, reservar, consultar/cancelar reservas y acceder al voucher.

## Estado después de S0

La reserva usa `create_reservation` de forma transaccional. El número de pasajeros usado para buscar se transfiere al modal y el modal se desmonta al cerrar, descartando PII y estado transitorio.

La autorización de cancelación está endurecida en PostgreSQL: una agencia solo puede cancelar una reserva creada por su usuario y perteneciente a una agencia a la que continúa vinculado; un operador solo puede cancelar reservas de su propia flota.

## R1 — búsqueda y contexto comercial

- La disponibilidad se consulta mediante `search_availability(DATE,TEXT,INT)`. Fecha, texto de ruta/origen/destino y pasajeros mínimos se filtran en PostgreSQL **antes** del `LIMIT 50`.
- El RPC de búsqueda es `SECURITY INVOKER`; RLS sigue siendo la autoridad de acceso.
- La pantalla carga todas las membresías permitidas en `agencies_users`. Si el usuario pertenece a más de una agencia, debe seleccionar explícitamente con cuál reservar; no se usa `.limit(1)` para escoger una organización arbitraria.
- `agencies.commission_rate` es la fuente de verdad de la comisión. La UI la muestra como estimación y `create_reservation` vuelve a calcular el importe en PostgreSQL al confirmar.
- El resultado exitoso usa `total_price` y `commission_amount` retornados por el RPC, evitando presentar como definitivo un cálculo exclusivamente cliente.

## Deuda funcional restante

- falta hold con expiración y política de liberación;
- falta pago/conciliación;
- faltan pasajeros individuales y manifiesto;
- falta redención operacional del voucher;
- falta E2E de navegador para login → búsqueda → reserva → voucher.

## Invariantes

- una agencia solo accede a organizaciones a las que pertenece;
- el contexto de agencia usado para reservar debe ser explícito cuando existen múltiples membresías;
- inventario final y comisión final los decide el RPC transaccional;
- el filtrado del catálogo debe ocurrir antes de limitar resultados;
- la cantidad inicial del modal debe representar la cantidad solicitada en la búsqueda y nunca superar `availableSeats`;
- cerrar un modal de reserva debe descartar PII y estado transitorio local;
- UI no inventa cupos, comisiones finales ni pagos;
- una corrección visual no debe debilitar validaciones de reserva ni autorización.
