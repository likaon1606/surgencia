import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import SearchBar from '../../../components/ui/SearchBar'
import toast from 'react-hot-toast'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import useConflicts from '../../../hooks/useConflicts'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConflictService } from '../../../services/conflicts.service'
import DOMPurify from 'dompurify'
import "./Conflict.css"

const Conflict = () => {
  const navigate = useNavigate()

  const { conflict, isLoading, isError, refetch } = useConflicts()
  const [filter, setFilter] = useState('')
  const [visibleConflicts, setVisibleConflicts] = useState(3)
  const [modalStates, setModalStates] = useState(conflict.map(() => false));

  const handleEditConflict = id => navigate('edit-conflict/' + id)

  const removeConflict = async(id,title) => {
    const status = window.confirm(`¿Estás seguro de eliminar el conflicto: "${title}"?`)
    if (status) {
      await toast.promise(ConflictService.remove(id), {
        loading: 'Eliminando...',
        success: (
          <p>
            Conflicto <b>{title}</b> eliminado con éxito
          </p>
        ),
        error: err => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
      })
      refetch()
    }
  }


  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const handleShowModal = (index) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
  };

  const handleCloseModal = (index) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = false;
    setModalStates(newModalStates);
  };

 const conflictsFiltered = conflict?.filter(conflict => conflict.title.toLowerCase().includes(filter.toLowerCase()))

 const handleLoadMore = () => {setVisibleConflicts(prevVisibleConflicts => prevVisibleConflicts + 3)}

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/conflict/add-conflict">
          {' '}
          <ButtonAdmin name="Agregar conflicto" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Conflictos</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <div className="mt-5 table-wrapper">
        {conflictsFiltered.slice(0, visibleConflicts).map((conflict, index) => (
          <div key={index} className="p-2 ">
            <div className="d-flex">
              <div className="ml-5 p-1 d-flex justify-content-between align-items-start conflict" style={{ width: '100%' }}>
                <div className="image-container">
                  <img className="rounded-circle" 
                  style={{ width: '7em', height: '7em' }} 
                  src={conflict.imageUrl} 
                  alt={conflict.title} />
                </div>
                <div className="m-3 w-75">
                  <p><b>{conflict.title}</b></p>
                  <p>{DOMPurify.sanitize(conflict.description.length > 150 ? `${conflict.description.slice(0, 150)}...` : conflict.description, { ALLOWED_TAGS: [''],})}</p>
                  
                </div>
                <div className="d-flex flex-column gap-2 button-container">
                  <button className="btn btn-primary" onClick={() => handleEditConflict(conflict.id)} style={{ width: '3em' }}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger"  onClick={() => removeConflict(conflict.id,conflict.title)} style={{ width: '3em' }}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
                    <Modal show={modalStates[index]} onHide={() => handleCloseModal(index)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{conflict.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-center flex-column">
                                <div className="d-flex justify-content-center mb-2">
                                  <img className="rounded-circle" 
                                    style={{ width: '9em', height: '9em' }} 
                                    src={conflict.imageUrl} 
                                    alt={conflict.title} />
                                </div>
                                <p>
                                    <b>Descripción:</b> {conflict.description}
                                </p>
                                <p>
                                    <b>Fecha:</b> {conflict.updatedAt}
                                </p>
                                <p>
                                    <b>Latitud:</b> {conflict.lat}
                                </p>
                                <p>
                                    <b>Longitud:</b> {conflict.lng}
                                </p>
                                <p>
                                    <b>Estado:</b> {conflict.status}
                                </p>
                            </div>
                            <p>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3456.1645536576025!2d${conflict.lng}!3d${conflict.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU4JzI4LjkiUyA3McKwMTgnMDEuNSJX!5e0!3m2!1ses-419!2scl!4v1701119238189!5m2!1ses-419!2scl`}
                className="w-100"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => handleCloseModal(index)}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="d-flex justify-content-center mt-2">
                        <Button variant="primary" onClick={() => handleShowModal(index)}>
                        Detalles
                        </Button>
                    </div>
                  </div>
            <hr/>
          </div>
        ))}
      </div>

      {conflictsFiltered.length > visibleConflicts && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default Conflict
