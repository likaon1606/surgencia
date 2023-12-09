import { useState } from 'react'
import { FaTrash, FaCheck, FaMapMarkerAlt, FaInfo } from 'react-icons/fa'
import { FaMagnifyingGlass } from "react-icons/fa6";
import ButtonBack from '../../../components/ui/ButtonBack'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useGetAllReports from '@/hooks/useGetAllReports'
import { ReportConflict } from '../../../services/report-conflict.service'
import toast from 'react-hot-toast'
import'./Report.css'

const ConflictReports = () => {
  const { data, isLoading, isError, refetch } = useGetAllReports();
  const [visibleConflicts, setVisibleConflicts] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index === selectedImageIndex ? null : index);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImageIndex(null); 
  };

  const handleApprovalClick = async () => {
    const selectedImageUrl = currentReport?.ReportImages?.[selectedImageIndex]?.imageUrl;

    if (!selectedImageUrl) {
      toast.error('Tiene que seleccionar una foto.');
      return;
    }

    const status = window.confirm(`¿Estás seguro de aprobar el reporte de "${currentReport?.name}"? Una vez aceptado, se creará un nuevo conflicto`);

    if (status) {
      try {
        const payload = {
          imageUrl: selectedImageUrl,
        };

        await toast.promise(ReportConflict.approve(currentReport?.id, payload), {
          loading: 'Aprobando...',
          success: (
            <p>
              Reporte <b>{currentReport?.name}</b> aprobado con éxito
            </p>
          ),
          error: (err) => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
        });

        refetch();
        setShowModal(false);
        setSelectedImageIndex(null);
      } catch (error) {
        console.error('Error al aprobar el reporte:', error);
        toast.error('Ha ocurrido un error al aprobar el reporte. Intente nuevamente.');
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const handleShowModal = report => {
    setCurrentReport(report)
    setShowModal(true)
  }

  const handleLoadMore = () => {
    setVisibleConflicts(prevVisibleConflicts => prevVisibleConflicts + 3)
  }

  const approveReport = async () => {
    const { id, name, ReportImages } = currentReport;
    const selectedImageUrl = currentReport?.ReportImages?.[selectedImageIndex]?.imageUrl;
    const status = window.confirm(`¿Estás seguro de aprobar el reporte de "${name}"? Una vez aceptado, se creará un nuevo conflicto`);
  
    if (status) {
      try {
        const payload = {
          imageUrl: selectedImageUrl,
        };
  
        await toast.promise(ReportConflict.approve(id, payload), {
          loading: 'Aprobando...',
          success: (
            <p>
              Reporte <b>{name}</b> aprobado con éxito
            </p>
          ),
          error: (err) => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
        });

        refetch();
      } catch (error) {
        console.error('Error al aprobar el reporte:', error);
        toast.error('Ha ocurrido un error al aprobar el reporte. Intente nuevamente.');
      }
    }
  };
  

  const confirmDelete = async (id, name) => {
    const status = window.confirm(`¿Estás seguro de eliminar el reporte de "${name}"?`)
    if (status) {
      await toast.promise(ReportConflict.remove(id), {
        loading: 'Eliminando...',
        success: (
          <p>
            Reporte <b>{name}</b> eliminado con éxito
          </p>
        ),
        error: err => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
      })
      refetch()
    }
  }

  return (
    <div className="mt-2 p-5">
      <ButtonBack />
      <h1 className="my-3">Reportes de Conflictos</h1>
      <div className="mt-5">
        <section className="table-wrapper table-responsive mt-5">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Reportador</th>
                <th>Detalle</th>
                <th>Sugerencias</th>
                <th>Aprobado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, visibleConflicts).map(report => (
                <tr key={report.id}>
                  <td>
                    <h6 className="value">{report.name}</h6>
                    <h6 className="value">{report.email}</h6>
                  </td>
                  <td>
                    <p className="label">Titulo:</p>
                    <h6 className="value mb-2">{report.title}</h6>

                    <p className="label">Descripción: </p>
                    <h6 className="value mb-2">{report.description}</h6>
                    <p className="label">Estado:</p>
                    <h6 className="value">Estado: {report.status}</h6>
                  </td>
                  <td>
                    <h6 className="value">{report.suggestion}</h6>
                  </td>
                  <td>
                    <h6 className="value">{report.active ? 'Si' : 'No'}</h6>
                  </td>
                  <td className="px-3">
                    <div className="d-flex flex-column gap-2 button-container">
                      <Button variant="warning" onClick={() => handleShowModal(report)} style={{ width: '3em' }}>
                        <FaMagnifyingGlass />
                      </Button>
                      <Button variant="danger" onClick={() => confirmDelete(report.id, report.name)} style={{ width: '3em' }}>
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentReport?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center flex-column">
            <p>
              <b>Descripción:</b> {currentReport?.description}
            </p>
            <p>
              <b>Fecha:</b> {currentReport?.updatedAt}
            </p>
            <p>
              <b>Latitud:</b> {currentReport?.lat}
            </p>
            <p>
              <b>Longitud:</b> {currentReport?.long}
            </p>
            <p>
              <b>Estado:</b> {currentReport?.status}
            </p>
            <Button
              variant="success"
              onClick={handleApprovalClick}
              className='w-25 mb-1 m-auto'
            >
              <FaCheck />
            </Button>
            <p className='text-center'>
            <h6>Seleccione una foto</h6>
            {currentReport?.ReportImages?.map((img, index) => (
            <img
              key={img + index}
              src={img.imageUrl}
              style={{ width: '200px', height: '200px', objectFit: 'cover'}}
              alt="Report Image"
              onClick={() => handleImageClick(index)}
              className={`report-image ${selectedImageIndex === index ? 'selected-image' : ''}`}
            />
          ))}
            </p>
            <p>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3456.1645536576025!2d${currentReport?.long}!3d${currentReport?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU4JzI4LjkiUyA3McKwMTgnMDEuNSJX!5e0!3m2!1ses-419!2scl!4v1701119238189!5m2!1ses-419!2scl`}
                className="w-100"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </p>            
          </div>
        </Modal.Body>
      </Modal>

      {data.length > visibleConflicts && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default ConflictReports
