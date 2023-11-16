import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { AllianceService } from '../services/alliance.service'

const useGetAlliance = () => {
  return useQuery('alliance', AllianceService.getAlliance, {
    onError: error => {
      toast.error(error?.message || 'Error al obtener nuestras alianzas')
    },
  })
}

export default useGetAlliance
