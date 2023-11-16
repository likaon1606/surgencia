import { Container } from 'react-bootstrap'
import LogRecoveryLayout from '../../layouts/LogRecoveryLayout'
import RecoverForm from './componentsRecover/RecoverForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BackButtonLogin from './componentsRecover/BackButtonLogin'

const RecoverPassword = () => {
  const title = '¿Olvidaste tu contraseña?'
  const description =
    'Ingresa tu correo electrónico y enseguida te enviaremos las instrucciones para restablecer tu contraseña'

  return (
    <div className="bg-secondary">
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Row className="col-12 col-sm-8 col-md-6 col-lg-4">
          <Col className="bg-white rounded">
            <BackButtonLogin />
            <LogRecoveryLayout titleLog={title} text={description}>
              <RecoverForm />
            </LogRecoveryLayout>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RecoverPassword
