import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-hot-toast'
import ButtonBack from '../../../components/ui/ButtonBack'
import { ResetPassword } from '@/services/change-password.service'

const useChangePassword = () => {
  const navigate = useNavigate()
  return useMutation(({ password, newPassword }) => ResetPassword.reset({ password, newPassword }), {
    onSuccess: () => {
      toast.success('Se actualizó tu contraseña correctamente')
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 2000)
    },
    onError: error => {
      const errorMessage = error?.response?.data?.message || error?.message
      toast.error(errorMessage || 'Algo salió mal, vuelve a intentarlo')
    },
  })
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const changePasswordMutation = useChangePassword()

  const onSubmit = data => {
    const { password, newPassword } = data

    if (password === newPassword) {
      toast.error('La contraseña no puede ser igual a la contraseña actual')
      return
    }

    changePasswordMutation.mutate(data)
  }

  return (
    <div className="mt-2 p-2 p-md-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
      </div>
      <h1 className="mt-3">Cambio de contraseña</h1>
      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
            <div className="d-flex align-items-center text-center">
              <form onSubmit={handleSubmit(onSubmit)} className="w-100 p-4 rounded">
                <label htmlFor="password" className="form-label">
                  Contraseña Actual:
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    {...register('password', { required: 'Contraseña actual obligatoria' })}
                  />
                  {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </label>
                <br />
                <label htmlFor="newPassword" className="form-label">
                  Nueva Contraseña:
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control"
                    {...register('newPassword', { required: 'Nueva contraseña obligatoria' })}
                  />
                  {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                </label>
                <br />
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirmar Nueva Contraseña:
                  <input
                    type="password"
                    id="confirmNewPassword"
                    className="form-control"
                    {...register('confirmNewPassword', {
                      required: 'Confirmación de contraseña obligatoria',
                      validate: {
                        matchesNewPassword: (value, { newPassword }) => {
                          return value === newPassword || 'Las contraseñas no coinciden'
                        },
                      },
                    })}
                  />
                  {errors.confirmNewPassword && (
                    <span className="text-danger">{errors.confirmNewPassword.message}</span>
                  )}
                </label>
                <br />
                <button type="submit" className="btn btn-primary">
                  Cambiar Contraseña
                </button>
              </form>
            </div>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default ChangePassword
