import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

import { LoginService } from '../services/login.service'
import useAuthStore from '../store/useAuthStore'

const useLogin = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation(LoginService.login, {
    onSuccess: ({ user }) => {
      toast.success(`¡Hola ${user?.firstName} ${user?.lastName}!`)
      toast.success('Sesion iniciada correctamente')
      setAuth({ user })
      navigate('/admin/dashboard')
    },
    onError: error => {
      toast.error(error?.message || 'Credenciales inválidas')
    },
  })
}

export default useLogin
