# Guía de desarrollo

## Requisitos

Node 22, npm compatible con lockfile, Supabase CLI y Docker para entorno local.

## Setup

```bash
git checkout dev
git pull
git checkout -b fix/descripcion-corta
npm ci
cp .env.example .env.local
supabase start
supabase db reset
npm run dev
```

En baseline `npm ci` está esperado a fallar hasta reparar el lockfile P0. No sustituir permanentemente por `npm install`.

## Antes de commit

```bash
npm run docs:validate
npm run docs:health
npm run changelog:validate
npm run lint
npm run typecheck
npm run test --if-present
npm run build
```

## Migraciones

- Crear nueva migración; no reescribir historia aplicada.
- Añadir RLS/GRANT explícito.
- Añadir índice si la query crítica lo requiere.
- Añadir/actualizar contrato RPC y test.

## Variables de entorno

Solo valores que pueden exponerse al navegador usan `NEXT_PUBLIC_`. Secretos de pagos, WhatsApp, firma QR o service role son server-only.
