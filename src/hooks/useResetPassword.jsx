import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ResetService } from '../services/reset.service'

const useResetPassword = () => {
  const navigate = useNavigate()
  return useMutation(ResetService.reset, {
    onSuccess: () => {
      navigate('/login')
      toast.success('Se actualizó tu contraseña correctamente')
    },
    onError: error => {
      const errorMessage = error?.response?.data?.message || error?.message
      toast.error(errorMessage || 'Algo salio mal, vuelve a intentarlo')
    },
  })
}

export default useResetPassword
