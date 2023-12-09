import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import logo from '../../../assets/imgSurgencia.png'

const CardBusiness = ({ name, lastName }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      <img src={logo} alt="logo" className="nav-logo"></img>
      <div>
        <h3 className="card-title text-primary">
          {name} {lastName}
        </h3>
        <small>Autor del Blog</small>
      </div>
    </div>
  )
}

export default CardBusiness
