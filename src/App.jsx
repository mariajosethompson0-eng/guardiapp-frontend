import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'
import Inicio from './components/pages/Inicio.jsx'
import SalaEspera from './components/pages/SalaEspera.jsx'
import Equipo from './components/pages/Equipo.jsx'
import Retribuciones from './components/pages/Retribuciones.jsx'
import NoEncontrada from './components/pages/NoEncontrada.jsx'

// App solo define las rutas: la lógica vive en pages, components y context.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="sala-espera" element={<SalaEspera />} />
        <Route path="equipo" element={<Equipo />} />
        <Route
          path="retribuciones"
          element={
            <RutaProtegida permiso="calculadora">
              <Retribuciones />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}