import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import useGeneratePassword from '../../../hooks/useGeneratePassword'

const GenerateForm = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmpassword: '',
    },
  })
  const { mutate, isLoading, status } = useGeneratePassword()

  const onSubmit = async data => {
    const token = searchParams.get('token')
    const id_user = searchParams.get('id_user')
    if (id_user) {
      mutate({ password: data.password, token, id_user })
    } else {
      toast.error('El token es requerido, revisa tu correo o vuelve a comenzar el proceso de generación de contraseña')
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex flex-column fw-bold mb-3">
        <label className="form-label fw-bold"> Nueva contraseña</label>
        <input
          type="password"
          className="border border-primary rounded-5 px-3"
          placeholder="ingresa nueva contraseña"
          {...register('password', {
            required: {
              value: true,
              message: 'este campo es requerido',
            },
            validate: value => {
              if (value.length < 8) {
                return 'La contraseña debe tener al menos 8 caracteres'
              } else if (!/^(?=.*\d)(?=.*[A-Za-z])/.test(value)) {
                return 'La contraseña debe tener al menos una letra y un número.'
              }
            },
          })}
        />
        {errors.password && <p className="text-danger small">{errors.password.message}</p>}
      </div>

      <div className="d-flex flex-column fw-bold mb-3">
        <label className="form-label fw-bold"> Confirmar contraseña</label>
        <input
          type="password"
          className="border border-primary rounded-5 px-3"
          placeholder="confirmar contraseña"
          {...register('confirmpassword', {
            required: {
              value: true,
              message: 'este campo es requerido',
            },
            validate: value => {
              if (value === watch('password')) {
                return true
              } else {
                return 'contraseñas no coinciden'
              }
            },
          })}
        />
        {errors.confirmpassword && <p className="text-danger small">{errors.confirmpassword.message}</p>}
      </div>
      {isLoading ? (
        <p>Cargando..</p>
      ) : (
        <button type="submit" className="text-bg-primary w-100 mb-3 mt-4 border border-primary rounded-5">
          Generar contraseña
        </button>
      )}
      <Toaster />
    </form>
  )
}

export default GenerateForm
