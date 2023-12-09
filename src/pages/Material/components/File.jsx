/* eslint-disable react/prop-types */
import './File.css'
import iconoDescargar from '../../../assets/icono-descargar.png'
import imgpreviewDefault from '../../../assets/DefaultImg.png'
import { Link } from 'react-router-dom'

const File = props => {
  const imagenSrc = props.image || imgpreviewDefault

  return (
    <div className="downloadable-file d-flex flex-column gap-3 justify-content-between m-3 w-25 text-center border align-items-center">
      <img src={imagenSrc} alt="imagePreview" className="imagePreview" />
      <h3 className='mat-title'>{props.title}</h3>
      <p className="mb-0">{props.author}</p>
      {props.externalUrl ? (
        <Link to={props.externalUrl} target="_blank" rel="noopener noreferrer" className="text-body text-decoration-none py-3">
          <div className="d-flex flex-row align-center w-100 justify-content-center">
            <img className="icono-descargar rounded-start" src={iconoDescargar} alt="icono-descarga" />
            <p className="descargar d-flex align-middle p-2 rounded-end">Ir a Descargar</p>
          </div>
        </Link>
      ) : null}
    </div>
  )
}

export default File
