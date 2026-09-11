# Entrada pública y login

**Código:** `src/app/page.tsx`.

Responsabilidad: autenticación y entrada inicial. Baseline: login Supabase funcional, pero fallback de navegación dirige a `/admin` sin resolver rol.

Dirección: tras login, resolver perfil/rol autorizado y redirigir a portal correspondiente. `next` solo se respeta si el usuario puede acceder al destino. No exponer detalles de errores de auth sensibles.
