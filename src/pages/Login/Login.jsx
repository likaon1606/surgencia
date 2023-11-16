import { Container } from 'react-bootstrap'
import LogRecoveryLayout from '../../layouts/LogRecoveryLayout'
import LoginForm from './components/LoginForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BackButton from './components/BackButton'

const Login = () => {
  const title = 'Ingresa a Surgencia'
  return (
    <div className="bg-secondary">
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Row className="col-lg-4">
          <Col className="bg-white shadow rounded">
            <BackButton />
            <LogRecoveryLayout titleLog={title}>
              <LoginForm />
            </LogRecoveryLayout>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
