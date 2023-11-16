import './card.css'
import photo from '../../../../assets/business-card.jpg'

const CardBusiness = ({ name, lastName, description }) => {
  return (
    <>
      <div className="card1">
        <div className="d-flex align-items-center">
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
          <h3 className="p-5">
            {name} {lastName}
          </h3>
        </div>
        <p className="description">{description}</p>
      </div>

      <div className="card2">
        <div className="d-flex align-items-center justify-content-end">
          <h3 className="p-5">
            {name} {lastName}
          </h3>
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
        </div>
        <p className="description2">{description}</p>
      </div>

      <div className="card1">
        <div className="d-flex align-items-center">
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
          <h3 className="p-5">
            {name} {lastName}
          </h3>
        </div>
        <p className="description">{description}</p>
      </div>

      <div className="card2">
        <div className="d-flex align-items-center justify-content-end">
          <h3 className="p-5">
            {name} {lastName}
          </h3>
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
        </div>
        <p className="description2">{description}</p>
      </div>

      <div className="card1">
        <div className="d-flex align-items-center">
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
          <h3 className="p-5">
            {name} {lastName}
          </h3>
        </div>
        <p className="description">{description}</p>
      </div>

      <div className="card2">
        <div className="d-flex align-items-center justify-content-end">
          <h3 className="p-5">
            {name} {lastName}
          </h3>
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
        </div>
        <p className="description2">{description}</p>
      </div>

      <div className="card1">
        <div className="d-flex align-items-center">
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
          <h3 className="p-5">
            {name} {lastName}
          </h3>
        </div>
        <p className="description">{description}</p>
      </div>

      <div className="card2">
        <div className="d-flex align-items-center justify-content-end">
          <h3 className="p-5">
            {name} {lastName}
          </h3>
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
        </div>
        <p className="description2">{description}</p>
      </div>

      <div className="card1">
        <div className="d-flex align-items-center">
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
          <h3 className="p-5">
            {name} {lastName}
          </h3>
        </div>
        <p className="description">{description}</p>
      </div>

      <div className="card2">
        <div className="d-flex align-items-center justify-content-end">
          <h3 className="p-5">
            {name} {lastName}
          </h3>
          <img src={photo} className="rounded-circle" style={{ width: '180px' }} alt="foto" />
        </div>
        <p className="description2">{description}</p>
      </div>
    </>
  )
}

export default CardBusiness
