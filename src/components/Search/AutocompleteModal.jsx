import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import { MdSearch } from 'react-icons/md'
import AutocompleteSearch from './Autocomplete'

export const AutocompleteModal = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <InputGroup.Text id="search-addon" className="ms-auto py-2 rounded" role="button" onClick={handleShow}>
        <MdSearch size={18} className="my-1" />
      </InputGroup.Text>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutocompleteSearch />
        </Modal.Body>
      </Modal>
    </>
  )
}
