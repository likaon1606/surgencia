import { useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import PropTypes from 'prop-types'
import '../reportConflict.css'

import useReportConflict from '../../../hooks/useReportConflict'
import { ImageService } from '@/services'

const ReportForm = ({ location }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm()
  const { mutate, isLoading } = useReportConflict()

  const navigate = useNavigate()
  const handleBackto = () => {
    navigate('/conflict')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const onSubmit = async ({ img, ...data }) => {
    const images = await ImageService.uploadMulti(img)
    mutate({ ...data, images })
  }

  useEffect(() => {
    if (location) {
      setValue('lat', location.lat)
      setValue('long', location.lng)
    }
  }, [location, setValue])

  return (
    <>
      <Button variant="warning" onClick={toggleSidebar} className="toggle-btn z-1">
        {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </Button>
      <div className={`form ${sidebarOpen ? 'open' : ''}`}>
        <header className="bg-warning p-2 position-sticky top-0">
          <Button variant="warning" onClick={toggleSidebar}>
            <FaArrowLeft />
          </Button>
        </header>
        <form className="bg-warning p-2 p-md-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center fs-4 px-4 mb-5 fw-bold">Ingresa tu denuncia</h1>
          <div className="mb-3">
            <div className="form-outline">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                {...register('name', {
                  minLength: {
                    value: 2,
                    message: 'Nombre debe tener al menos dos caracteres',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Nombre no puede exceder de 20 caracteres',
                  },
                })}
              />
              {errors.name && <p className="text-danger small">{errors.name.message}</p>}
            </div>
          </div>

          <div className="form-outline mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Debes ingresar un correo valido',
                },
              })}
            />
            {errors.email && <p className="text-danger small">{errors.email.message}</p>}
          </div>
          <div className="form-outline mb-3">
            <label className="form-label">¿Cual es el evento que esta impactando en el sitio?</label>
            <input
              type="text"
              className="form-control"
              {...register('title', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              })}
            />
            {errors.title && <p className="text-danger small">{errors.title.message}</p>}
          </div>
          <div className="form-outline mb-3">
            <label className="form-label">Describa su denuncia</label>
            <textarea
              className="form-control"
              rows="4"
              {...register('description', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              })}
            />
            {errors.description && <p className="text-danger small">{errors.description.message}</p>}
          </div>
          <div className="form-outline mb-3">
            <label className="form-label">
              Foto(obligatorio)<span className="small"></span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-control"
              {...register('img', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              })}
            />
            {errors.img && <p className="text-danger small">{errors.img.message}</p>}
          </div>

          <div className="form-outline mb-3">
            <label className="form-label">¿Cuando fue tomada esta fotografía?</label>
            <input
              type="date"
              className="form-control"
              {...register('dateTaken', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
                valueAsDate: true,
              })}
              defaultValue={new Date().toISOString().substring(0, 10)}
            />
            {errors.dateTaken && <p className="text-danger small">{errors.dateTaken.message}</p>}
          </div>
          <div className="form-outline mb-3">
            <label className="form-label">¿Que acciones se podrían llevar a cabo para disminuir esta amenaza?</label>
            <textarea
              className="form-control"
              rows="4"
              {...register('suggestion', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              })}
            />
            {errors.suggestion && <p className="text-danger small">{errors.suggestion.message}</p>}
          </div>
          <div>
            <label htmlFor="status" className="form-label mt-2 mb-3">
              Estado del conflicto:
            </label>
            <select
              className="mx-2"
              name="status"
              {...register('status', {
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              })}
            >
              <option value="Amenaza">Amenaza</option>
              <option value="En curso">En curso </option>
              <option value="Consecuencias">Consecuencias</option>
            </select>
            {errors.status && <p className="text-danger small">{errors.status.message}</p>}
          </div>

          <div className="d-flex p-2 pt-5 justify-content-end">
            <button type="button" className="btn btn-block mb-4 btn-outline-dark mx-2 " onClick={handleBackto}>
              Cancelar
            </button>
            {isLoading ? (
              <p>Cargando login</p>
            ) : (
              <button type="submit" className="btn btn-dark btn-block mb-4 mx-2" disabled={!isValid}>
                Guardar
              </button>
            )}
          </div>
          <p className="small p fst-italic">
            *Esta información será validada por el equipo antes de ser publicado en la pagina.
          </p>
          <Toaster />
        </form>
      </div>
    </>
  )
}

ReportForm.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}

export default ReportForm
