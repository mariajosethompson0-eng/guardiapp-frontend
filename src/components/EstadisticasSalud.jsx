import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Card, Col, ProgressBar, Row, Spinner } from "react-bootstrap"

const API_URL = import.meta.env.VITE_API_URL

const PREVENCION = [
  { icono: "bi-shield-check", titulo: "Vacunación al día", texto: "Mantener el esquema de vacunación completo reduce el riesgo de cuadros graves." },
  { icono: "bi-droplet", titulo: "Lavado de manos", texto: "Lavarse con agua y jabón con frecuencia, sobre todo antes de comer y al volver de la calle." },
  { icono: "bi-wind", titulo: "Ventilar ambientes", texto: "Abrir ventanas y renovar el aire en espacios cerrados disminuye el contagio." },
  { icono: "bi-telephone", titulo: "Consultar ante síntomas", texto: "Si tenés fiebre, tos o dificultad para respirar, evitá el contacto y consultá a un profesional." },
]

export default function EstadisticasSalud() {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const obtenerDatos = async () => {
      try {
        const response = await axios.get(API_URL, { signal: controller.signal })
        setDatos(response.data)
      } catch (err) {
        if (axios.isCancel(err)) return
        setError("No se pudieron cargar las estadísticas.")
        Swal.fire({
          icon: "error",
          title: "Error al cargar los datos",
          text: "No se pudo conectar con la API. Intentá de nuevo más tarde.",
        })
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    obtenerDatos()
    return () => controller.abort()
  }, [])

  if (cargando) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-secondary">Cargando estadísticas...</p>
      </div>
    )
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  const tasaRecuperacion = ((datos.recovered / datos.cases) * 100).toFixed(1)
  const actualizado = new Date(datos.updated).toLocaleString("es-AR")

  const items = [
    { icono: "bi-clipboard2-pulse", color: "primary", titulo: "Casos totales", valor: datos.cases, desc: "Personas con diagnóstico confirmado desde el inicio de la pandemia." },
    { icono: "bi-heart-pulse", color: "success", titulo: "Recuperados", valor: datos.recovered, desc: "Personas que superaron la enfermedad y recibieron el alta." },
    { icono: "bi-activity", color: "warning", titulo: "Casos activos", valor: datos.active, desc: "Personas que hoy siguen cursando la enfermedad." },
    { icono: "bi-person-x", color: "danger", titulo: "Fallecidos", valor: datos.deaths, desc: "Víctimas fatales registradas desde el inicio." },
    { icono: "bi-search", color: "info", titulo: "Tests realizados", valor: datos.tests, desc: "Estudios de diagnóstico hechos en todo el país." },
    { icono: "bi-people", color: "secondary", titulo: "Población", valor: datos.population, desc: "Habitantes del país, para dimensionar los números." },
  ]

  return (
    <section className="my-5">
      <div className="mb-4">
        <h2 className="h3 fw-bold mb-2">
          <i className="bi bi-bar-chart-line text-primary me-2" aria-hidden="true" />
          Salud pública: COVID-19 en {datos.country}
        </h2>
        <p className="text-secondary mb-0">
          Una guardia médica trabaja mejor cuando conoce el contexto sanitario. Estos son los números
          oficiales de COVID-19 en el país: cuántas personas se enfermaron, cuántas se recuperaron y
          cuántas siguen con la enfermedad hoy.
        </p>
      </div>

      <Row className="g-3 mb-4">
        {items.map((item) => (
          <Col key={item.titulo} xs={12} sm={6} lg={4}>
            <Card className="h-100 bg-body-tertiary">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <i className={`bi ${item.icono} fs-4 text-${item.color} me-2`} aria-hidden="true" />
                  <span className="text-secondary">{item.titulo}</span>
                </div>
                <p className="h3 fw-bold mb-1">{item.valor.toLocaleString("es-AR")}</p>
                <p className="small text-secondary mb-0">{item.desc}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="bg-body-tertiary mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">Tasa de recuperación</span>
            <span className="text-success fw-bold">{tasaRecuperacion}%</span>
          </div>
          <ProgressBar variant="success" now={Number(tasaRecuperacion)} aria-label="Tasa de recuperación" />
          <p className="small text-secondary mt-2 mb-0">
            De cada 100 personas que se contagiaron, aproximadamente {Math.round(tasaRecuperacion)} se recuperaron.
          </p>
        </Card.Body>
      </Card>

      <h3 className="h5 fw-bold mb-3">
        <i className="bi bi-shield-plus text-primary me-2" aria-hidden="true" />
        Cómo prevenir el contagio
      </h3>
      <Row className="g-3">
        {PREVENCION.map((p) => (
          <Col key={p.titulo} xs={12} sm={6} lg={3}>
            <Card className="h-100 border-primary-subtle">
              <Card.Body>
                <i className={`bi ${p.icono} fs-3 text-primary`} aria-hidden="true" />
                <h4 className="h6 fw-bold mt-2">{p.titulo}</h4>
                <p className="small text-secondary mb-0">{p.texto}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <p className="small text-secondary mt-4 mb-0">
        Fuente: disease.sh · Actualizado: {actualizado}
      </p>
    </section>
  )
}