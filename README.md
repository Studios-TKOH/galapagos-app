# 🚢 Galapagos System - Proyecto Principal

---

## 🎨 TAREAS PARA EL ASISTENTE DE UI (UI ASSISTANT)
¡Hola! Si estás leyendo esto, es porque vas a ayudar a pulir la interfaz visual de este proyecto. La estructura base, los componentes pesados y la lógica de enrutamiento ya están listos. 

**Para no complicarte la vida, por favor enfócate ÚNICAMENTE en estas tareas sencillas:**

1. **Efectos Hover (Interacciones sutiles)**: 
   - Revisa los botones en `/admin` y `/agency`. Asegúrate de que todos tengan clases como `hover:scale-105`, `active:scale-95` o `transition-all duration-300` para que se sientan vivos al pasar el mouse.
2. **Modo Oscuro (Dark Mode) Consistente**: 
   - Busca fondos que se sientan muy brillantes de noche. Asegúrate de que las tarjetas usen `dark:bg-slate-900` o `dark:bg-slate-800` y textos `dark:text-white` o `dark:text-slate-300`.
3. **Píldoras y Badges**:
   - Revisa los estados (Confirmado, Pendiente, Cancelado) en la tabla de Auditoría (`/admin/audit/page.tsx`) y en Reservas (`/agency/reservations/page.tsx`). Asegúrate de que los colores sean consistentes.
4. **Imágenes de Fondo**:
   - En la vista de login (`/page.tsx`) o el buscador de agencias (`/agency/page.tsx`), puedes experimentar cambiando los links de las fotos de `Unsplash` por fotos de Galápagos aún más espectaculares.
5. **Íconos**:
   - Todo el proyecto usa `lucide-react`. Si un ícono te parece aburrido, cámbialo por uno mejor de la librería.

**Regla de Oro**: ¡No toques los "hooks" (`useState`, `useEffect`) ni la lógica de datos! Solo diviértete con las clases de Tailwind CSS (`className="..."`).

---
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
