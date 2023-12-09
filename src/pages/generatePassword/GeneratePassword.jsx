import { Container } from 'react-bootstrap'
import LogRecoveryLayout from '../../layouts/LogRecoveryLayout'
import GenerateForm from './componentsGenerate/GenerateForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const GeneratePassword = () => {
  return (
    <div className="bg-secondary">
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Row className="col-12 col-sm-8 col-md-6 col-lg-4">
          <Col className="bg-white rounded">
            <LogRecoveryLayout titleLog="Generá tu contraseña">
              <GenerateForm />
            </LogRecoveryLayout>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default GeneratePassword
