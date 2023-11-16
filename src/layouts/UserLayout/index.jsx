import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row, Button, Offcanvas } from 'react-bootstrap'
import { Sidebar } from './Sidebar'
import useAuthStore from '@/store/useAuthStore'
import imgLogo from '../../assets/imgSurgencia.png'
import quienesSomos from '../../assets/featuresIcons/quienes_somos.svg'
import './Sidebar.css'
import { Loader } from '../../components/ui/Loader/Loader'

export const UserLayout = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [showSidebar, setShowSidebar] = useState(false)

  const closeSidebar = () => {
    setShowSidebar(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSidebar(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!user || user === null) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <React.Suspense fallback={<Loader />}>
      <div className="hamburguer-container">
        <div className="header-container">
          <Button className="transparent-btn" onClick={() => setShowSidebar(true)}>
            ☰
          </Button>
          <img src={imgLogo} width="50" alt="React Bootstrap logo" />
          <img alt="about_us" src={quienesSomos} width="25" height="25" />
        </div>
      </div>
      <div className="d-flex">
        <div className="bg-light">
          <Container>
            <Row>
              <Col>
                <Sidebar closeSidebar={closeSidebar} />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="w-100">
          <Container>
            <Outlet />
          </Container>
        </div>
        <Offcanvas
          show={showSidebar}
          onHide={() => setShowSidebar(false)}
          className="userOffcanvas userLayoutOffcanvas"
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar closeSidebar={closeSidebar} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </React.Suspense>
  )
}
