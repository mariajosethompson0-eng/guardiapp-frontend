# GuardiasApp

Aplicación web para digitalizar la guardia médica: registro de pacientes, sala de espera ordenada por triage, gestión del equipo de guardia y cálculo de retribuciones. Desarrollada en React como migración de un proyecto HTML/Bootstrap.

## Funcionalidades

- **Inicio:** resumen del estado del servicio (atendidos hoy, espera media, pacientes activos) y estadísticas de salud pública consumidas desde una API.
- **Sala de espera:** alta de pacientes y ordenamiento por nivel de triage.
- **Equipo médico:** listado y gestión de los médicos de guardia.
- **Retribuciones:** calculadora de retribución, accesible solo con permisos.
- **Login con roles:** administrador, recepcionista y médico, con permisos distintos por acción.
- **Consumo de API pública:** estadísticas de COVID-19 con estado de carga y manejo de errores.

## Tecnologías

- React + Vite
- React Router
- React Bootstrap y Bootstrap Icons
- Axios (peticiones HTTP)
- SweetAlert2 (avisos al usuario)
- React Helmet Async (metadatos y SEO)
- Context API (`AuthProvider` y `GuardiaProvider`)

## Instalación

```bash
git clone https://github.com/mariajosethompson0-eng/guardiapp-frontend.git
cd guardiapp-frontend
npm install
```

## Estructura del proyecto

```
src/
├── components/   # componentes reutilizables (NavBar, modales, tablas, EstadisticasSalud, Seo)
├── context/      # AuthProvider, GuardiaProvider y contexts.js
├── data/         # constantes (permisos, perfiles, estados)
├── hooks/        # useApp, useLocalStorage
├── pages/        # Inicio, SalaEspera, Equipo, Retribuciones, NoEncontrada
├── utils/        # funciones de formato
├── App.jsx       # definición de rutas
└── main.jsx      # punto de entrada
```
## SEO y metadatos

El proyecto aplica estrategias de SEO para que los buscadores entiendan de qué trata cada página.

### Metadatos por página

Cada página define su propio título y descripción con el componente `Seo.jsx`, que usa `react-helmet-async` para modificar el `<head>`:

```jsx
<Seo
  titulo="GuardiasApp | Recepción, Triage y Sala de Espera en Tiempo Real"
  descripcion="GuardiasApp digitaliza la guardia médica: registra pacientes, ordena la sala de espera por triage y gestiona al equipo de guardia."
/>
```

Esto genera, para cada ruta:

- `<title>`: título único que aparece en la pestaña y en los resultados de Google.
- `<meta name="description">`: resumen que se muestra debajo del título en el buscador.

En `index.html` están las metas generales del sitio:

```html
<html lang="es">
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Estrategias aplicadas

- **Título y descripción únicos** en cada página, con palabras clave del tema (guardia médica, triage, sala de espera).
- **Etiquetas semánticas:** `section`, `header`, `nav`, `main` y `footer` en lugar de `div` genéricos.
- **Un solo `<h1>` por página**, con subtítulos ordenados (`h2`, `h3`).
- **Atributo `lang="es"`** para indicar el idioma del contenido.
- **Diseño responsive** con Bootstrap, que los buscadores valoran en celulares.
- **Íconos decorativos con `aria-hidden="true"`** y texto descriptivo en enlaces y botones, para accesibilidad.
- **Ruta 404** propia (`NoEncontrada`) para las URL inexistentes.
- **Rendimiento:** build optimizado con Vite y carga de datos con estado de carga.

## Flujo de trabajo con Git

| Rama | Uso |
|---|---|
| `main` | Producción: solo código estable |
| `dev` | Integración de las partes del proyecto |
| `feature/*`, `fix/*`, `refactor/*` | Una rama por cada cambio, con Pull Request hacia `dev` |

Los commits siguen la convención Conventional Commits: `feat`, `fix`, `refactor`, `chore`, `docs`.

## Deploy

La aplicación está desplegada en Vercel, que publica automáticamente cada cambio que llega a `main`:
[https://guardiapp-frontend.vercel.app](https://guardiapp-frontend.vercel.app)

## Autora

- María José Thompson
