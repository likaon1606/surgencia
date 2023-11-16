import React from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

export const SidebarLink = ({ to, closeSidebar, children }) => {
  const handleClick = () => {
    closeSidebar()
  }

  return (
    <Nav.Link className="">
      <NavLink
        to={to}
        onClick={handleClick}
        className={({ isActive }) =>
          `d-flex align-items-center gap-3 col-12 text-black text-decoration-none ${isActive ? 'active' : ''}`
        }
      >
        {children}
      </NavLink>
    </Nav.Link>
  )
}
