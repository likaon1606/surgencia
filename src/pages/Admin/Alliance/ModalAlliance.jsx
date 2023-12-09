import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { allianceSchema } from '@/schemas/allianceSchema'
import { AllianceService, ImageService } from '../../../services'
import { useState } from 'react'
import { Loader } from '@/components/ui/Loader/Loader'


const ModalAlliance = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      file: null,
      name: '',
      active: true,
    },
    resolver: yupResolver(allianceSchema),
  })

  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      setLoading(true)
      
      const allianceLogo = await ImageService.upload(file[0])
      await AllianceService.create({
        ...payload,
        allianceLogo,
      })
      toast.success('Alianza agregado con éxito')
      setTimeout(() => {
        navigate('/admin/alliance')
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
    <div className="AgregarAlianza mt-2 p-5">
      <div className="mt-3">
        <h1>Agregar Alianza</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="name" label="Nombre:" control={control} />
            <Input name="url" label="URL (Opcional):" control={control} />
            <label className="fs-4">Logo de Alianza</label>
            <p>500x500px</p>
            <input type="file" className="form-control" accept="image/*" {...register('file')} />
            <small className="d-block text-danger">{errors?.file?.message}</small>
          </div>
          <div className="form-group mt-3 d-flex justify-item-center align-items-center">
            <input type="checkbox" className="form-check-input m-2" {...register('active')} />
            <label>Activo</label>
          </div>
          <div className="mt-5 d-flex gap-5">
            <button className="btn btn-primary" style={{ width: '10em', height: '2.5em' }} onClick={''}>
              Guardar
            </button>
            <Link to="/admin/alliance">
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

export default ModalAlliance
