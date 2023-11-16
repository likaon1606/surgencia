import { Container } from 'react-bootstrap'
import LogRecoveryLayout from '../../layouts/LogRecoveryLayout'
import ResetForm from './componentsReset/ResetForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ResetPassword = () => {
  return (
    <div className="bg-secondary">
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Row className="col-12 col-sm-8 col-md-6 col-lg-4">
          <Col className="bg-white rounded">
            <LogRecoveryLayout titleLog="Restablecer contraseña" text="Ingrese su nueva contraseña">
              <ResetForm />
            </LogRecoveryLayout>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ResetPassword
