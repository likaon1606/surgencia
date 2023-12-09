import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AdministratorService } from '../services/administrator.service'

const useGeneratePassword = () => {
  const navigate = useNavigate()
  return useMutation(AdministratorService.generate, {
    onSuccess: () => {
      navigate('/login')
      toast.success('Se creo tu contraseña correctamente')
    },
    onError: error => {
      const errorMessage = error?.response?.data?.message || error?.message
      toast.error(errorMessage || 'Algo salio mal, vuelve a intentarlo')
    },
  })
}

export default useGeneratePassword
