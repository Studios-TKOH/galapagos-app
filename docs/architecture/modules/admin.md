# Módulo Admin

**Código:** `src/app/admin`, `src/components/admin`.

Responsabilidad: visión global, catálogo, agencias, embarcaciones, auditoría y configuración. En baseline el dashboard y listados consumen datos reales; alta de embarcaciones persiste; alta de agencias/tours y settings siguen incompletos.

Invariantes: admin no debe saltarse RLS desde navegador; toda acción destructiva requiere confirmación/auditoría; métricas de ventas deben distinguir reservado de cobrado.

Cambios que requieren actualizar este doc: nuevas rutas admin, cambio de permisos, CRUD productivo, nuevas métricas o dependencias cross-module.
