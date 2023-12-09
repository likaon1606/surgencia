import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaQuestion } from 'react-icons/fa'

function ConfirmModal({ show, handleClose, handleConfirm }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center">
        <FaQuestion
          className="m-4 p-4 text-info-emphasis border border-4 border-light-subtle rounded-circle"
          style={{ width: '5.25em', height: '5.25em' }}
        />
        <Modal.Title className="mb-2">¿Estás seguro?</Modal.Title>
        <p>No podrás revertir está acción</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.string,
}

export default ConfirmModal
