import PropTypes from 'prop-types'
import imgLogo from '../assets/logo.png'

const LogRecoveryLayout = ({ children, text, titleLog }) => {
  const imgStyle = {
    height: '112px',
  }
  return (
    <div className="d-flex flex-column gap-3 align-items-center justify-content-center pb-4">
      <div className=" d-flex">
        <img src={imgLogo} alt="Surgencia logo" style={imgStyle} />
      </div>
      <div>
        <h4 className="fw-bold">{titleLog}</h4>
      </div>
      <div>
        <p className="text-muted px-2 text-center"><small>{text}</small></p>
      </div>
      <div className="w-100 px-5 mt-3">{children}</div>
    </div>
  )
}

LogRecoveryLayout.propTypes = {
  children: PropTypes.element,
  titleLog: PropTypes.element,
  text: PropTypes.element,
}

export default LogRecoveryLayout
