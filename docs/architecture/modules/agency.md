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

## R2 — cobertura E2E crítica

El flujo `login agency → búsqueda → reserva → voucher` queda cubierto por un navegador Chromium real contra una instancia Supabase efímera. El fixture usa una agencia con comisión de 20%, una salida con 10 cupos y precio base de USD 40; la prueba confirma reserva de dos pasajeros, voucher público válido y decremento final a 8 cupos.

El test no sustituye los tests de integración: complementa RLS/RPC verificando que el contrato funciona desde la interfaz hasta PostgreSQL y de vuelta a la pantalla pública.

## Deuda funcional restante

- hold con expiración e idempotencia disponible en backend; pendiente payment ledger e integración UI;
- falta pago/conciliación;
- faltan pasajeros individuales y manifiesto;
- falta redención operacional del voucher;
- faltan E2E negativos, cancelación/reprogramación y flujos operator/guide.

## Invariantes

- una agencia solo accede a organizaciones a las que pertenece;
- el contexto de agencia usado para reservar debe ser explícito cuando existen múltiples membresías;
- inventario final y comisión final los decide el RPC transaccional;
- el filtrado del catálogo debe ocurrir antes de limitar resultados;
- la cantidad inicial del modal debe representar la cantidad solicitada en la búsqueda y nunca superar `availableSeats`;
- cerrar un modal de reserva debe descartar PII y estado transitorio local;
- UI no inventa cupos, comisiones finales ni pagos;
- una corrección visual no debe debilitar validaciones de reserva ni autorización.
- los holds no se presentan como pagos ni emiten voucher hasta la confirmación autoritativa;
