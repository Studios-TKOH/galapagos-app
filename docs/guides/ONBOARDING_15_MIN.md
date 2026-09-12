# Onboarding en 15 minutos

## Min 0–3: producto y estado
Lee `README.md` y el resumen de `BASELINE.md`. Retén: el proyecto está en estabilización; no asumir producción lista.

## Min 3–7: reglas
Lee `AI_CONTEXT.md`, sobre todo seguridad, lógica crítica en servidor y anti-patrones.

## Min 7–10: arquitectura
Abre `docs/architecture/module-map.md` y el documento del módulo que vas a tocar.

## Min 10–12: roadmap
Comprueba en `docs/roadmap/ROADMAP.md` si tu cambio pertenece a la fase activa y si depende de un P0.

## Min 12–15: contribución
Lee `docs/guides/GIT_WORKFLOW.md`. Crea `feature/*` o `fix/*` desde `dev`, no desde `main`; ejecuta checks; usa plantilla PR.

## Cinco cosas que jamás debes hacer

1. push directo a `main`;
2. desactivar RLS/strict/lint para desbloquearte;
3. usar `service_role` en cliente;
4. cambiar inventario/reservas críticos desde UI evitando RPC;
5. mergear comportamiento nuevo sin actualizar docs/tests correspondientes.
