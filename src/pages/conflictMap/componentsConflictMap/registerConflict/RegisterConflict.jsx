import { Link } from "react-router-dom"

const RegisterConflict = () => {
  return (
    <div className="bg-dark-subtle rounded shadow m-5">
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '12rem'}}>
        <h4 className="text-center">¿Quieres registrar una denuncia?</h4>
        <div className="d-md-block">
          <Link to="/reporter-conflict"> <button type="button" className="btn btn-dark btn-lg mt-4 d-md-block">Ingresa aqui</button></Link>
        </div>
    </div>
</div>

  )
}

export default RegisterConflict