# Auth y seguridad

**Código:** `src/lib/auth`, `src/proxy.ts`, layouts protegidos y RLS.

Baseline: roles `admin`, `agency`, `operator`; guards server-side. Bug conocido: redirect de login por defecto a `/admin`. RLS/multitenancy requiere hardening, especialmente ownership de operador y tablas no cubiertas explícitamente.

Reglas: autorización real vive en servidor/RLS; `service_role` nunca cliente; signup B2B no asigna rol operativo automáticamente; cambios de permisos requieren pruebas de integración negativas y positivas.
