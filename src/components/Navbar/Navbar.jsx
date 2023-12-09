import { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../../assets/imgSurgencia.png'
import './Navbar.css'
import instagram from '../../assets/featuresIcons/mdi_instagram.svg'
import facebook from '../../assets/featuresIcons/ic_baseline-facebook.svg'
import AutocompleteSearch from '../Search/Autocomplete'
import { AutocompleteModal } from '../Search/AutocompleteModal'
import { routes } from './routes'

const { Toggle, Offcanvas: Ocanvas } = Navbar

const NavigatorNav = ({ searchBar }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Navbar
        expand={false}
        className="border-dark border-bottom p-3 row mx-0 justify-content-between align-items-center"
      >
        {/* Toogle */}
        <div className="col-4">
          <Toggle className="border-0" onClick={handleShow} />
        </div>

        {/* Logo */}
        
        <div className="col-4 text-center">
        <Link to="/"><img src={logo} alt="logo" className="nav-logo"></img></Link>
        </div>

        {/* SearchBar */}
        <div className="col-4 d-none d-md-block">
          <AutocompleteSearch />
        </div>
        <div className="col-4 d-flex d-md-none">
          <AutocompleteModal />
        </div>

        <Ocanvas show={show} onHide={handleClose} placement="start">
          <Offcanvas.Header closeButton className="me-4 text-dark p-4"></Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between align-items-start ">
            <Nav className="justify-content-start flex-grow-1 pe-3 link-item p-3">
              {routes.map((route, i) => (
                <Link
                  className="fs-3 text-decoration-none nav-item"
                  to={route.path}
                  key={route.path}
                  onClick={handleClose}
                >
                  {route.label}
                </Link>
              ))}
            </Nav>
            <div className="d-flex flex-row w-100 pb-3">
              <img src={logo} alt="logo" width="80" className="logo"></img>
              <div className="d-flex justify-content-end align-items-end w-100 gap-2">
                <a href="https://www.instagram.com/ongsurgencia" target="_blank">
                  <img src={instagram} alt="logo" width="40" className=""></img>
                </a>
                <a href="https://web.facebook.com/ongsurgencia/?locale=es_LA&_rdc=1&_rdr" target="_blank">
                  <img src={facebook} alt="logo" width="40" className=""></img>
                </a>
              </div>
            </div>
          </Offcanvas.Body>
        </Ocanvas>
      </Navbar>
    </>
  )
}

NavigatorNav.propTypes = {
  backButton: PropTypes.element,
  searchBar: PropTypes.element,
}

export default NavigatorNav
