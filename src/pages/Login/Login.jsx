import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import LogRecoveryLayout from '../../layouts/LogRecoveryLayout'
import LoginForm from './components/LoginForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BackButton from './components/BackButton'
import useAuthStore from '../../store/useAuthStore'

const Login = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard')
    }
  }, [user, navigate])
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
