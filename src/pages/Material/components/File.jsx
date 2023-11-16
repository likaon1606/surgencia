/* eslint-disable react/prop-types */
import "./File.css"
import iconoDescargar from "../../../assets/icono-descargar.png"

const File = (props) =>{
    return(
        <div className="downloadable-file d-flex flex-column justify-content-center m-3 p-3 w-25 text-center border align-items-center">
            <h3 className="h-50">{props.title}</h3>
            <p>{props.firstName} {props.lastName}</p>
            <div className="d-flex flex-row align-center w-100 justify-content-center">
                <img className="icono-descargar" src={iconoDescargar} alt="icono-descarga"/>
                <p className="descargar d-flex align-middle p-2">Descargar</p>
            </div>
        </div>
    )
}


export default File