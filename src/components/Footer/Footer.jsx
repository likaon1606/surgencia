import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="border-top mt-auto">
      <div className="container py-3 d-flex justify-content-between align-items-center">
        <div>
          <p className="font-weight-bold">Políticas de privacidad</p>
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
      </div>
    </footer>
  )
}

export default Footer
