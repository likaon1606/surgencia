import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { editConflictSchema } from '@/schemas/conflictSchema'
import { ConflictService } from '../../../services/conflicts.service'
import { ImageService } from '../../../services/images.service.js'
import { FaEdit } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import { Loader } from '@/components/ui/Loader/Loader'
import helplatlong from '../../../assets/helplatlong.jpg'

const EditConflict = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [imagePreview, setImagePreview] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, control, errors, setValue } = useForm({
    resolver: yupResolver(editConflictSchema),
  })

  useEffect(() => {
    const getConflictData = async () => {
      const conflictData = await ConflictService.getConflictById(id)
      setValue('title', conflictData.title)
      setValue('lat', conflictData.lat)
      setValue('lng', conflictData.lng)
      setValue('active', conflictData.active)
      setValue('description', conflictData.description)
      setImagePreview(conflictData.imageUrl)
    }

    getConflictData()
  }, [])

  const handleOnChange = async e => {
    try {
      const file = e.target.files
      const imageUrl = await ImageService.upload(file[0])
      setImagePreview(imageUrl)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      setLoading(true)
      let imageUrl
      if (file && file[0]) {
        imageUrl = await ImageService.upload(file[0])
      } else {
        imageUrl = imagePreview
      }

      await ConflictService.update(
        {
          ...payload,
          imageUrl,
        },
        id,
      )
      toast.success('Conflicto editado con éxito')
      setTimeout(() => {
        navigate('/admin/conflict')
      }, 1000)
    } catch (error) {
      console.error({ error })
      setLoading(false)
    }
  })

  if (loading) {
    return <Loader />
  }

  return (
    <div className="mt-2 p-5">
      <div className="mt-3">
        <h1>Editar Conflicto</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="title" label="Titulo:" control={control} />
            <Input type="number" name="lat" label="Latitud:" control={control} />
            <Input type="number" name="lng" label="Longitud:" control={control} />
          </div>
          <div className="form-group mt-3">
            <div style={{ height: '240px' }}>
              <Input type="text" name="description" label="Descripción:" control={control} />
              <p>Puede visitar <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">GoogleMaps</a> para obtener las coordenadas</p><img src={helplatlong} alt="Ayuda para obterner coordenadas" />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 d-flex flex-column flex-wrap space-between">
          <div className="form-group">
            <label className="fs-4">Imagen del Conflicto</label>
            <div className="bg-secondary bg-opacity-10 py-2 px-2 rounded text-center">
              <div className="mx-3">
                <img
                  className="rounded-3"
                  style={{ width: '7em', height: '7em', objectFit: ' cover' }}
                  src={imagePreview}
                />
              </div>
              <Button
                variant="outline-dark"
                className="rounded-pill btn-sm m-3"
                onClick={() => {
                  setShowInput(!showInput)
                }}
              >
                <FaEdit /> Editar Imagen
              </Button>
              {showInput && (
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  {...register('file')}
                  onChange={handleOnChange}
                />
              )}
            </div>

            <small className="d-block text-danger">{errors?.file?.message}</small>
          </div>
          <div className="form-group">
            <div className="form-group mt-3 d-flex justify-content-center flex-column">
              <label className="fs-4">Estado del conflicto</label>
              <select id="status" name="status" required {...register('status')}>
                <option value="Amenaza">Amenaza</option>
                <option value="Proceso">En proceso</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-row mt-3 mb-3">
            <input type="checkbox" className="form-check-input m-1" {...register('active')} />
            <label>Marcar la casilla para aprobar</label>
          </div>
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-primary" style={{ width: '10em', height: '2.5em' }}>
              Guardar
            </button>
            <Link to="/admin/conflict">
              <button className="btn btn-secondary" style={{ width: '10em' }}>
                Volver
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditConflict
