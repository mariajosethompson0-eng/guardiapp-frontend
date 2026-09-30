import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"

const SITIO = "https://guardiapp-frontend.vercel.app"

// SEO por página: título, descripción, canonical, Open Graph y Twitter.
export default function Seo({ titulo, descripcion, noIndex = false }) {
  const { pathname } = useLocation()
  const url = `${SITIO}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`
  const tituloCompleto = pathname === "/" ? titulo : `${titulo} | GuardiasApp`

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descripcion} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={descripcion} />
    </Helmet>
  )
}