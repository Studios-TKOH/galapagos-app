# Módulo Operator

**Código:** `src/app/operator`, `src/components/operator`.

Responsabilidad: operación de salidas, cupos y redención online de vouchers propios. Dirección futura: manifiesto, check-in/scanner con cámara y redención offline.

Baseline: edición de cupos mediante RPC. Falta ownership robusto por operador/organización y creación completa de salidas.

Invariantes: operador solo ve/modifica recursos asignados; la redención se autoriza y persiste mediante RPC PostgreSQL atómico; acciones de inventario y redención se auditan; UI móvil/táctil es prioritaria.
