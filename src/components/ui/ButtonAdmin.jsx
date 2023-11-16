import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ButtonAdmin = ({ name, backgroundColor, textColor, onClick, size, width }) => {
  const buttonStyles = {
    backgroundColor: backgroundColor,
    color: textColor || (backgroundColor === 'black' ? 'white' : 'black'),
  }

  if (size) {
    buttonStyles['fontSize'] = size
  }

  if (width) {
    buttonStyles['width'] = width
  }

  return (
    <Button className="btn-vertical btn-rounded btn-dark" style={buttonStyles} onClick={onClick}>
      {name}
    </Button>
  )
}

ButtonAdmin.propTypes = {
  name: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  width: PropTypes.string,
}

export default ButtonAdmin
