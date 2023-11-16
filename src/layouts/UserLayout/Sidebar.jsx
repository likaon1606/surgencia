import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import imgLogo from '../../assets/imgSurgencia.png'
import blog from '../../assets/featuresIcons/blogger.svg'
import conf from '../../assets/featuresIcons/configuraciones.svg'
import inicio from '../../assets/featuresIcons/inicio.svg'
import map from '../../assets/featuresIcons/map.svg'
import materialDesc from '../../assets/featuresIcons/material_desc.svg'
import quienesSomos from '../../assets/featuresIcons/quienes_somos.svg'
import password from '../../assets/featuresIcons/password.svg'
import alliance from '../../assets/featuresIcons/alliance.svg'
import project from '../../assets/featuresIcons/project.svg'
import { SidebarLink } from './SidebarLink'
import './Sidebar.css'

export const Sidebar = ({ closeSidebar }) => {
  return (
    <Navbar className="d-flex flex-column min-vh-100 bg-gray">
      <div className="d-none d-md-block d-flex justify-content-center my-5">
        <img src={imgLogo} width="69" height="98" className="align-items-center" alt="React Bootstrap logo" />
      </div>
      <Container>
        <Nav className="d-flex gap-3 flex-column justify-content-around px-3">
          <SidebarLink
            to="/admin/dashboard"
            closeSidebar={closeSidebar}
            className="d-flex align-items-center gap-3 col-12"
          >
            <img alt="home" src={inicio} width="30" height="30" className="d-inline-block align-top" />
            Inicio
          </SidebarLink>
          <SidebarLink to="/admin/about" closeSidebar={closeSidebar} className="d-flex align-items-center gap-3 col-12">
            <img alt="about_us" src={quienesSomos} width="30" height="30" className="d-inline-block align-top" />
            Miembros
          </SidebarLink>
          <SidebarLink to="/admin/blog" closeSidebar={closeSidebar} className="d-flex align-items-center gap-3 col-12">
            <img alt="blog" src={blog} width="30" height="30" className="d-inline-block align-top" /> Blog
          </SidebarLink>
          <SidebarLink
            to="/admin/material"
            closeSidebar={closeSidebar}
            className="d-flex align-items-center gap-3 col-12"
          >
            <img alt="material" src={materialDesc} width="30" height="30" className="d-inline-block align-top" />
            Material Descargable
          </SidebarLink>
          <SidebarLink to="/admin/home" closeSidebar={closeSidebar} className="d-flex align-items-center gap-3 col-12">
            <img alt="map" src={map} width="30" height="30" className="d-inline-block align-top" /> Mapa de Conflictos
          </SidebarLink>
          <SidebarLink
            to="/admin/project"
            closeSidebar={closeSidebar}
            className="d-flex align-items-center gap-3 col-12"
          >
            <img alt="project" src={project} width="30" height="30" className="d-inline-block align-top" />
            Proyectos
          </SidebarLink>
          <SidebarLink
            to="/admin/alliance"
            closeSidebar={closeSidebar}
            className="d-flex align-items-center gap-3 col-12"
          >
            <img alt="alliance" src={alliance} width="30" height="30" className="d-inline-block align-top" />
            Alianzas
          </SidebarLink>
          <SidebarLink to="/admin/home" closeSidebar={closeSidebar} className="d-flex align-items-center gap-3 col-12">
            <img alt="setup" src={conf} width="30" height="30" className="d-inline-block align-top" /> Configuración
          </SidebarLink>
          <SidebarLink to="/admin/password" closeSidebar={closeSidebar} className="d-flex align-items-center gap-3 col-12">
            <img alt="password" src={password} width="30" height="30" className="d-inline-block align-top" />
            Cambio de Contraseña
          </SidebarLink>
        </Nav>
      </Container>
    </Navbar>
  )
}
