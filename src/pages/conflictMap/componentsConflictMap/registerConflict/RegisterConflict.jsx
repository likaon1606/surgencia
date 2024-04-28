import { Link } from 'react-router-dom'

const RegisterConflict = () => {
  return (
    <div className="bg-dark-subtle rounded shadow my-5">
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '12rem' }}>
        <h4 className="text-center">Tú también puedes aportar con tu registro.</h4>
        <div className="d-md-block">
          <Link className="text-decoration-none" to="/report">
            {' '}
            <button type="button" className="btn btn-dark btn-lg mt-4 d-md-block">
              Ingresa aqui
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterConflict
