# Módulo Admin

**Código:** `src/app/admin`, `src/components/admin`.

Responsabilidad: visión global, catálogo, agencias, embarcaciones, auditoría y configuración. En baseline el dashboard y listados consumen datos reales; alta de embarcaciones persiste; alta de agencias/tours y settings siguen incompletos.

## Estado S0

- El historial de auditoría mantiene un cliente Supabase memoizado y consultas de solo lectura limitadas a los últimos 100 eventos.
- Se eliminó deuda de lint sin alterar comportamiento ni permisos del módulo.
- El hardening RLS de S0 sigue siendo la autoridad real: el navegador admin no recibe `service_role` ni bypass implícito.

## Invariantes

- admin no debe saltarse RLS desde navegador;
- toda acción destructiva requiere confirmación/auditoría;
- métricas de ventas deben distinguir reservado de cobrado;
- cambios que afecten seguridad o scopes deben quedar registrados en `audit_logs` y en documentación.

Cambios que requieren actualizar este doc: nuevas rutas admin, cambio de permisos, CRUD productivo, nuevas métricas o dependencias cross-module.
