# Capa de datos

**Código:** `src/lib/supabase`, `supabase/migrations`.

PostgreSQL/Supabase es la fuente de verdad. Las migraciones son append-only: no editar una migración histórica ya aplicada para cambiar comportamiento; crear una nueva.

Baseline: schema inicial, RLS parcial, hardening y booking engine RPC. `supabase/config.toml` referencia un seed inexistente. El lock de dependencias JS está desincronizado.

Todo nuevo objeto público debe definir RLS/GRANT, índices relevantes, estrategia de auditoría y test de integración.
