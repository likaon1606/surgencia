import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { projectSchema } from '@/schemas/projectSchema'
import { ProjectsService, ImageService } from '../../../services'

const ModalProject = () => {
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
      activityTitle: '',
      activityDescription: '',
      active: true,
    },
    resolver: yupResolver(projectSchema),
  })

  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      const projectLogo = await ImageService.upload(file[0])
      const data = await ProjectsService.create({
        ...payload,
        projectLogo,
      })
      toast.success('Proyecto agregado con éxito')
      setTimeout(() => {
        navigate('/admin/project')
      }, 1000)
    } catch (error) {
      console.error({ error })
    }
  })

  return (
    <div className="AgregarProyectos mt-2 p-5">
      <div className="mt-3">
        <h1>Agregar Proyecto</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="name" label="Nombre:" control={control} />
            <Input name="activityTitle" label="Titulo:" control={control} />
            <Input name="url" label="URL (Opcional):" control={control} />
            <Input name="activityDescription" label="Descripcion:" control={control} />
            <div className="form-group">
            <label className="fs-4">Logo de Proyecto:</label>
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
            <Link to="/admin/project">
              <button className="btn btn-secondary" style={{ width: '10em' }}>
                Volver
              </button>
            </Link>
          </div>
          </div>          
        </div>
      </form>
    </div>
  )
}

export default ModalProject
