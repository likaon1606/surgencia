import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Footer.css'
import logoIncubadora from '../../assets/logoIncubadora.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="border-top mt-auto bg-white">
      <div className="container py-3 d-flex flex-wrap justify-content-between align-items-center">
        <div>
      <p className="font-weight-bold">
        <Link to="https://docs.google.com/document/d/1pvsHsJt2nYCz_3XCPkTVrH_zRfEtAfcRer5AZIBNa3s/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
          Políticas de privacidad
        </Link>
      </p>
    </div>
        <div>
          <p className="font-weight-bold">© 2023 ONG Surgencia</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div>
            <p className="font-weight-bold">Contáctanos</p>
          </div>
          <div>
            <a href="https://www.instagram.com/ongsurgencia/reels/" target="_blank">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png"
                alt="Instagram logo"
                className="logo-img rounded"
              />
            </a>
            <a href="https://web.facebook.com/ongsurgencia/?locale=es_LA&_rdc=1&_rdr" target="_blank">
              <img
                src="https://cdn-icons-png.flaticon.com/128/174/174848.png"
                alt="Facebook logo"
                className="logo-img rounded"
              />
            </a>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p className="font-weight-bold mb-1">Team Desarrollo</p>
          <Link to="/DevTeam">
            <img src={logoIncubadora} alt="Incubadora" className="logo-incubadora" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
