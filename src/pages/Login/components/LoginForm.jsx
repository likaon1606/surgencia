import { useForm, Controller } from 'react-hook-form'
import useLogin from '../../../hooks/useLogin'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { mutate, isLoading } = useLogin()
  const navigate = useNavigate();
  const handlePasswordRecovery = () => {
    navigate('/RecoverPassword');
  }

  const onSubmit = ({ email, password }) => {
    mutate({ email, password })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column mb-3 gap-1">
          <label htmlFor="email" className="fw-bold">
            Correo Electrónico
          </label>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Debes ingresar un correo válido' }}
            render={({ field }) => (
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                className={`form-control rounded-5 px-3 py-1 ${errors.email ? 'is-invalid' : ''}`}
                {...field}
              />
            )}
          />
          {errors.email && <div className="text-danger fs-7 px-2">{errors.email.message}</div>}
        </div>
        <div className="d-flex flex-column gap-1">
          <label htmlFor="password" className="fw-bold">
            Contraseña
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Debes ingresar una contraseña válida' }}
            render={({ field }) => (
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className={`form-control rounded-5 px-3 py-1 ${errors.password ? 'is-invalid' : ''}`}
                {...field}
              />
            )}
          />
          {errors.password && <div className="text-danger fs-7 px-2">{errors.password.message}</div>}
        </div>
        <div className="d-flex flex-column align-items-center justify-content-between py-5">
          {isLoading ? (
            <p>Cargando login</p>
          ) : (
            <button type="submit" className="text-bg-primary w-100 mb-3 border border-primary rounded-5 py-1">
              Ingresar
            </button>
          )}
          <button
            type="button"
            className="bg-white text-primary w-100 mb-3 border border-primary rounded-5 py-1"
            onClick={handlePasswordRecovery}
          >
            Recuperar Contraseña
          </button>
          <Toaster />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
