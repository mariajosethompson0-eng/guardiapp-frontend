import { Container } from "react-bootstrap"

export default function Footer() {
  return (
    <footer className="border-top text-secondary py-3 text-center small">
      <Container>
        &copy; {new Date().getFullYear()} GuardiasApp · Proyecto académico UTN FRT · María José Thompson, Legajo 61026
      </Container>
    </footer>
  )
}
