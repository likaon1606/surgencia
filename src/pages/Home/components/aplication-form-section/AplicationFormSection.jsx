import './aplicationFormSection.css'
import mapamundo from '../../../../assets/mapamundo.png'
import imgSurgencia from '../../../../assets/imgSurgencia.png'

const AplicationFormSection = () => {
  return (
    <div className="container-fluid rounded-top-end p-4">
      <div className="row p-4 mt-5 justify-content-md-center">
        <div className="col-sm-12 col-lg-5 d-flex flex-column align-items-center  p-5">
          <h4 className="mb-4 text-center">Únete a nosotros y sé parte del cambio</h4>
          <p className="text-center">
            ¿Te apasiona el patrimonio costero-marino de la Región de Coquimbo? Únete a nuestra organización y
            contribuye a conservarlo y ponerlo en valor. Juntos, como agentes de cambio, abordaremos los desafíos
            socio-ambientales de nuestro territorio para lograr una convivencia en equilibrio con nuestro hermoso borde
            costero y el mar de Coquimbo.
          </p>
          <button type="button" className="btn btn-primary mt-5">
            Únete a surgencia
          </button>
        </div>
        <div className="col-lg-4">
          <img src={imgSurgencia} className="img-fluid mx-auto d-block" alt="imgSurgencia" loading="lazy" />
        </div>
      </div>

      <div>
        <img src={mapamundo} className="img-fluid mx-auto d-block" alt="mapamundo" loading="lazy" />
      </div>
    </div>
  )
}

export default AplicationFormSection
