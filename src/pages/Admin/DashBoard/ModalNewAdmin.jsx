import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Input } from '@/components/form/Input'
import { adminSchema } from '@/schemas/adminSchema'
import { AdministratorService } from '../../../services'

const ModalNewAdmin = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    resolver: yupResolver(adminSchema),
  })

  const onSubmit = handleSubmit(async ({ ...payload }) => {
    const isConfirmed = window.confirm('¿Estás seguro que deseas agregar un nuevo administrador?')

    if (!isConfirmed) {
      return
    }

    try {
      const data = await AdministratorService.create({
        ...payload,
      })
      toast.success('Se enviará a su correo un enlace para generar su contraseña')
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 3000)
    } catch (error) {
      console.error({ error })
    }
  })

  return (
    <div className="AgregarAlianza mt-2 p-5">
      <div className="mt-3">
        <h1>Crear nuevo Administrador</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="firstName" label="Nombre:" control={control} />
            <Input name="lastName" label="Apellido:" control={control} />
            <Input name="email" label="E-Mail:" control={control} />
          </div>
          <div className="mt-5 d-flex gap-5">
            <button type="submit" className="btn btn-primary" style={{ width: '10em', height: '2.5em' }}>
              Guardar
            </button>
            <Link to="/admin/dashboard">
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

export default ModalNewAdmin
