import Container from 'react-bootstrap/Container'
import img404 from '../../assets/img404.png'
import RootLayout from '../../layouts/RootLayout'
import { Card } from 'react-bootstrap'

const Error404 = () => {
  return (
    <RootLayout>
      <Container className="d-flex flex-column align-items-center text-center py-4">
        <h1 className="fw-bold">Error 404</h1>
        <img src={img404} width={400} alt="pagina no encontrada" />
        <p>Oops! pagina no encontrada</p>
      </Container>
    </RootLayout>
  )
}
export default Error404
