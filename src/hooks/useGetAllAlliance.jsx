import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { AllianceService } from '../services/alliance.service'

const useGetAllAlliance = () => {
  return useQuery('alliance', AllianceService.getAllAlliance, {
    onError: error => {
      toast.error(error?.message || 'Error al obtener nuestras alianzas')
    },
  })
}

export default useGetAllAlliance
