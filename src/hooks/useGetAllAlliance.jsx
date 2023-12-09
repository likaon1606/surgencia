import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { AllianceService } from '../services/alliance.service'

const useGetAllAlliance = () => {
  const { data, isLoading, isError, refetch } = useQuery('alliance', AllianceService.getAllAlliance, {
    onError: error => {
      toast.error(error?.message || 'Error al obtener nuestras alianzas')
    },
  });

  return { data, isLoading, isError, refetch };
}

export default useGetAllAlliance;
