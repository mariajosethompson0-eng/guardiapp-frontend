# 🏥 GuardiasApp Frontend — React + Vite + React-Bootstrap

Migración de GuardiasApp (repo 1: HTML, CSS y JavaScript) a una aplicación de una sola página con **React**, **Vite** y **React-Bootstrap**. Permite registrar pacientes, ordenar la sala de espera según el triage, ver al equipo de guardia y estimar retribuciones.

## 🎓 Información académica

- **Institución:** Universidad Tecnológica Nacional (UTN FRT)
- **Alumna:** María José Thompson
- **Legajo:** 61026
- **Modalidad:** Proyecto individual (SPA en React, sin backend)
- **Repositorio 1 (versión estática):** GuardiasApp con HTML + CSS + JS
- **Repositorio 2 (este):** migración progresiva a React + Vite

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| React | Interfaz basada en componentes reutilizables |
| Vite | Servidor de desarrollo y build |
| React-Bootstrap + Bootstrap 5.3 | Componentes y diseño (tema oscuro) |
| Bootstrap Icons | Iconografía |
| React Router | Rutas de la aplicación |
| React Helmet Async | Metadatos SEO por página |
| Git y GitHub | Control de versiones (`main`, `dev`, `feature/*`) |
| Vercel | Despliegue |

## ▶️ Cómo ejecutarlo

```bash
git clone https://github.com/mariajosethompson0-eng/guardiapp-frontend.git
cd guardiapp-frontend
npm install
npm run dev
```

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera la carpeta `dist` para producción |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | Revisa el código con ESLint |

## 📁 Arquitectura

```
src/
├── main.jsx            Arranque y providers (Helmet, Router, Auth, Guardia)
├── App.jsx             Solo define las rutas
├── index.css           Paleta del tema (variables de Bootstrap)
├── pages/              Una por ruta; arman la pantalla llamando componentes
├── components/         Piezas reutilizables que reciben todo por props
├── context/            Estado global (sesión y datos de la guardia)
├── hooks/              useApp (useAuth, useGuardia) y useLocalStorage
├── data/               Constantes, permisos y datos de ejemplo
└── utils/              Formato de moneda, horas y turno
```

**Principios aplicados**

- `App.jsx` es únicamente el orquestador de rutas.
- Las `pages` no tienen lógica de negocio: consumen los contextos y pasan props a los componentes.
- Los listados se generan con `.map()` y `key` estable.
- Los valores calculados (indicadores, totales de la calculadora) se derivan al renderizar, sin `useEffect`.
- Los formularios usan `Form` de React-Bootstrap con validación nativa y mensajes de error.
- Los componentes de presentación (`MedicoCard`, `StatCard`, `TriageBadge`) no conocen el estado global.

## 🧭 Rutas

| Ruta | Página | Acceso | Indexable |
|---|---|---|---|
| `/` | Inicio y estado del servicio | Público | Sí |
| `/sala-espera` | Admisión y lista de pacientes | Público (acciones según rol) | Sí |
| `/equipo` | Equipo médico de guardia | Público (acciones según rol) | Sí |
| `/retribuciones` | Calculadora de retribuciones | Administrador | No |
| `*` | Error 404 | Público | No |

## 👥 Roles

Cuentas de prueba, todas con la clave `1234`.

| Usuario | Rol | Puede |
|---|---|---|
| `recepcion` | Recepcionista | Admitir, atender, finalizar y eliminar pacientes |
| `medico` | Médico | Atender, finalizar y cambiar su estado de guardia |
| `admin` | Administrador | Añadir y dar de baja médicos, usar la calculadora |

> El acceso es una simulación del lado del cliente con fines didácticos. Un sistema real debe autenticar en un servidor.

## 🔎 Estrategia SEO

Una SPA entrega un único HTML, así que el SEO se resuelve en dos capas:

1. **Capa estática (`index.html`):** metadatos base, Open Graph, Twitter y datos estructurados. Están fijos porque los rastreadores de WhatsApp, Facebook y X **no ejecutan JavaScript** y solo leen este archivo.
2. **Capa dinámica (`components/Seo.jsx`):** cada página declara su propio título, descripción y URL canónica con React Helmet Async. Google sí ejecuta JavaScript y toma estos valores por ruta.

**Otros recursos**

- HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Un único `<h1>` por página y jerarquía de títulos ordenada.
- `lang="es"`, enlace "Saltar al contenido" y `aria-label` en regiones.
- `noindex` en páginas que no deben aparecer en buscadores (calculadora, 404 y acceso restringido).
- `vercel.json` con una regla de reescritura para que Vercel sirva la app al entrar directo a cualquier ruta.

### Etiquetas de `index.html` (18 `<meta>` + 3 elementos)

**Base y autoría**

| Etiqueta | Función |
|---|---|
| `charset` | Codificación UTF-8 (tildes y ñ). |
| `viewport` | Diseño adaptable a celulares. |
| `<title>` | Título de la pestaña y de los resultados. |
| `description` | Resumen que Google suele mostrar bajo el título. |
| `author` | Autoría del proyecto. |
| `theme-color` | Color de la barra del navegador en móviles. |

**Indexación**

| Etiqueta | Función |
|---|---|
| `robots` (`index, follow`) | Autoriza indexar y seguir enlaces. |
| `<link rel="canonical">` | URL preferida; evita contenido duplicado. |
| `<link rel="icon">` | Ícono de pestaña (SVG embebido). |

**Open Graph** (WhatsApp, Facebook, LinkedIn): `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`.

**Twitter / X:** `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`.

**Datos estructurados:** `<script type="application/ld+json">` con el esquema `WebApplication` de schema.org (categoría de salud, autora e idioma).

### Etiquetas que cambia `Seo.jsx` por ruta

| Etiqueta | Valor |
|---|---|
| `<title>` | Título propio de la página + "GuardiasApp" |
| `description` | Descripción propia de cada ruta |
| `robots` | `index, follow` o `noindex, nofollow` |
| `canonical` | URL de la ruta actual |
| `og:title`, `og:description`, `og:url` | Datos de la ruta |
| `twitter:title`, `twitter:description` | Datos de la ruta |

## 🌐 Despliegue en Vercel

Vercel detecta Vite automáticamente. La configuración equivale a:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- `vercel.json` reescribe todas las rutas a `index.html`; sin él, entrar directo a `/equipo` da 404.

Cada Pull Request genera una URL de vista previa y cada merge a `main` publica en producción.

### ⚠️ Antes de publicar

1. Verificá la URL real del proyecto en Vercel (panel *Domains*). Si no es `https://guardiapp-frontend.vercel.app`, reemplazala en `index.html` y en la constante `SITIO` de `src/components/Seo.jsx`.
2. Agregá la imagen `og-guardiasapp.png` (1200 × 630 px) dentro de `public/`.

## 🔄 Migración desde el repositorio 1

| Repo 1 | Repo 2 |
|---|---|
| `index.html` (secciones) | `pages/` y `components/` |
| `style.css` | `src/index.css` |
| `main.js` (datos y permisos) | `data/constantes.js` |
| `main.js` (estado) | `context/` |
| `main.js` (render con `innerHTML`) | Componentes con `.map()` |
| `alert`, `confirm`, `prompt` | Toast y modales de React-Bootstrap |

