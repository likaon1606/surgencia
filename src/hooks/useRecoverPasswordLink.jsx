import { RecoverService } from '../services/recover.service'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'

const useRecoverPasswordLink = () => {
  return useMutation(RecoverService.recover, {
    onSuccess: ({ message }) => {
      toast.success(message || `Se ha enviado un email a su correo`)
    },
    onError: error => {
      toast.error(error?.message || 'Algo salio mal')
    },
  })
}

export default useRecoverPasswordLink
