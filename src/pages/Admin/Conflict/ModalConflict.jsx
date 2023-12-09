import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { conflictSchema } from '@/schemas/conflictSchema.js'
import { ConflictService } from '../../../services/conflicts.service.js'
import { ImageService } from '../../../services/images.service.js'
import { useState } from 'react'
import { Loader } from '@/components/ui/Loader/Loader.jsx'
import helplatlong from '../../../assets/helplatlong.jpg'

const ModalConflict = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: {
      file: null,
      title: '',
      lat: '',
      lng: '',
      description: '',
      active: true,
    },
    resolver: yupResolver(conflictSchema),
  })

  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      setLoading(true)
      const imageUrl = await ImageService.upload(file[0])
      await ConflictService.create({
        ...payload,
        imageUrl,
      })
      toast.success('Conflicto agregado con éxito')
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
        <h1>Agregar Conflicto</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="title" label="Titulo:" control={control} />
            <Input type="number" name="lat" label="Latitud:" control={control} />
            <Input type="number" name="lng" label="Longitud:" control={control} />            
          <div className="form-group mt-3">
            <div style={{ height: '240px' }}>
              <Input type="text" name="description" label="Descripción:" control={control} />
              <p>Puede visitar <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">GoogleMaps</a> para obtener las coordenadas</p><img src={helplatlong} alt="Ayuda para obterner coordenadas" />
          </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 d-flex flex-column flex-wrap space-between">
          <div className="form-group">
            <label className="fs-4">Imagen de Perfil</label>
            <p>500x500px</p>
            <input type="file" className="form-control" accept="image/*" {...register('file')} />
            <small className="d-block text-danger">{errors?.file?.message}</small>
          </div>
          <div className="form-group mt-3 d-flex justify-content-center flex-column">
            <label className="fs-4">Estado del conflicto</label>
            <select name="status" required {...register('status')}>
              <option value="Amenaza">Amenaza</option>
              <option value="Proceso">En proceso</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
          <div className="d-flex flex-row mt-3 mb-3">
            <input type="checkbox" className="form-check-input m-1" required {...register('active')} />
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

export default ModalConflict
