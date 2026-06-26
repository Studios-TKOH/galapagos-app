# 🚢 Galapagos System - Proyecto Principal

---

## 🎨 TAREAS PARA EL ASISTENTE DE UI (UI ASSISTANT)
¡Hola! Si estás leyendo esto, es porque vas a ayudar a pulir la interfaz visual de este proyecto. La estructura base, los componentes pesados y la lógica de enrutamiento ya están listos. 

**Para no complicarte la vida, por favor enfócate ÚNICAMENTE en estas tareas:**

1. **Cacería de Bugs Visuales (QA Visual)**:
   - Navega por todas las pantallas simulando ser un usuario real. Si ves algún texto desalineado, un botón que se corta en móviles o algo que "se vea raro", corrígelo usando clases de Tailwind.
2. **Mejora de Animaciones (Smooth UI)**: 
   - Revisa las transiciones. Añade animaciones suaves en los modales, botones y tarjetas (ej. `transition-all duration-300 ease-in-out`, `hover:scale-105`, `active:scale-95`). El sistema debe sentirse "vivo".
3. **Modo Oscuro (Dark Mode) Consistente**: 
   - Busca fondos que se sientan muy brillantes de noche. Asegúrate de que las tarjetas usen `dark:bg-slate-900` o `dark:bg-slate-800` y textos `dark:text-white` o `dark:text-slate-300`.
4. **Auditoría de Consola y Advertencias**:
   - Abre las herramientas de desarrollador del navegador (F12) y revisa la consola. Si encuentras advertencias de React (ej. falta de `key` en listas, clases anidadas incorrectas) o errores leves, arréglalos.
5. **Píldoras, Badges e Íconos**:
   - Revisa los estados (Confirmado, Pendiente, Cancelado). Asegúrate de que los colores sean consistentes. Todo el proyecto usa `lucide-react`, si ves íconos que no encajan, cámbialos.
6. **Mejoras de Accesibilidad y UX**:
   - Si crees que un texto es muy pequeño o un contraste de colores dificulta la lectura, mejóralo. Tu instinto de diseño manda aquí.

**Regla de Oro**: ¡No toques los "hooks" complejos (`useState`, `useEffect`) de lógica de negocio profunda ni el flujo de datos! Concéntrate en la experiencia visual, la fluidez y en arreglar advertencias menores.

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
