import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import useSidebarStore from '@/store/useSidebarStore'

export const SidebarLink = ({ to, name, src }) => {
  const closeSidebar = useSidebarStore(s => s.closeSidebar)

  return (
    <NavLink
      to={to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center gap-3 px-3 col-12 text-black text-decoration-none ${
          isActive ? 'active rounded' : ''
        }`
      }
    >
      <img alt={name} src={src} width="30" height="30" />
      <span>{name}</span>
    </NavLink>
  )
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
}
