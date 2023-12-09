import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Offcanvas } from 'react-bootstrap'
import { Sidebar } from './Sidebar'
import useAuthStore from '@/store/useAuthStore'
import imgLogo from '../../assets/imgSurgencia.png'
import quienesSomos from '../../assets/featuresIcons/quienes_somos.svg'
import './Sidebar.css'
import { Loader } from '../../components/ui/Loader/Loader'
import { Toaster } from 'react-hot-toast'
import useSidebarStore from '@/store/useSidebarStore'

export const UserLayout = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { showSidebar, setShowSidebar } = useSidebarStore()

  useEffect(() => {
    if (!user || user === null) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <React.Suspense fallback={<Loader fullHeight />}>
      <div className="hamburguer-container">
        <div className="header-container">
          <Button className="transparent-btn" onClick={() => setShowSidebar(true)}>
            ☰
          </Button>
          <img src={imgLogo} width="50" alt="React Bootstrap logo" />
          <img alt="about_us" src={quienesSomos} width="25" height="25" />
        </div>
      </div>
      <div className="d-flex overflow-hidden" style={{ maxHeight: '100vh' }}>
        <div className="bg-sidebar">
          <Offcanvas
            show={showSidebar}
            onHide={() => setShowSidebar(false)}
            className="userOffcanvas userLayoutOffcanvas"
            responsive="md"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className='overflow-y-auto'>
              <Sidebar />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="w-100 overflow-auto">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
      <Toaster />
    </React.Suspense>
  )
}
