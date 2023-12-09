import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import imgLogo from '../../assets/imgSurgencia.png'
import blog from '../../assets/featuresIcons/blogger.svg'
import conf from '../../assets/featuresIcons/configuraciones.svg'
import inicio from '../../assets/featuresIcons/inicio.svg'
import map from '../../assets/featuresIcons/map.svg'
import report from '../../assets/featuresIcons/report.svg'
import materialDesc from '../../assets/featuresIcons/material_desc.svg'
import quienesSomos from '../../assets/featuresIcons/quienes_somos.svg'
import banner from '../../assets/featuresIcons/banner.svg'
import password from '../../assets/featuresIcons/password.svg'
import alliance from '../../assets/featuresIcons/alliance.svg'
import project from '../../assets/featuresIcons/project.svg'
import logouticon from '../../assets/featuresIcons/logout.svg'
import useLogout from '../../hooks/useLogout'
import { toast } from 'react-hot-toast'
import { SidebarLink } from './SidebarLink'
import './Sidebar.css'
import useAuthStore from '../../store/useAuthStore'

export const Sidebar = () => {
  const { user } = useAuthStore()
  const { logout } = useLogout()

  const handleLogoutClick = () => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas salir?')
    if (isConfirmed) {
      logout()
      toast.success('Sesión cerrada exitosamente')
    }
  }

  return (
    <Navbar className="d-flex flex-column vh-100 bg-gray">
      <div className="d-none d-md-block d-flex justify-content-center my-4">
        <img src={imgLogo} width="69" height="98" className="align-items-center" alt="React Bootstrap logo" />
      </div>
      <Nav className="w-100 d-flex gap-3 flex-column align-items-stretch p-3">
        <SidebarLink src={inicio} name="Inicio" to="/admin/dashboard" />
        <SidebarLink src={banner} name="Banners" to="/admin/banners" />
        <SidebarLink src={quienesSomos} name="Quienes Somos" to="/admin/about" />
        <SidebarLink src={blog} name="Noticias" to="/admin/blog" />
        <SidebarLink src={materialDesc} name="Material Descargable" to="/admin/material" />
        <SidebarLink src={report} name="Reportes de Conflictos" to="/admin/reports" />
        <SidebarLink src={map} name="Mapa de Conflictos" to="/admin/conflict" />
        <SidebarLink src={project} name="Proyectos" to="/admin/project" />
        <SidebarLink src={alliance} name="Alianzas" to="/admin/alliance" />
        <SidebarLink src={password} name="Cambio de Contraseña" to="/admin/password" />
        {user?.isAdmin && <SidebarLink src={conf} name="Administradores" to="/admin/users" />}
        <button onClick={handleLogoutClick} className="nav-link d-flex align-items-center gap-3 px-3">
          <img alt="logout" src={logouticon} width="30" height="30" />
          Salir
        </button>
      </Nav>
    </Navbar>
  )
}
