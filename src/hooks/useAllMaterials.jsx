import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { MaterialService } from '../services/material.service'

const useAllMaterials = () => {
  const { data, isLoading, isError, refetch } = useQuery('materials', MaterialService.getAllMaterials, {
    onError: error => {
      toast.error(error?.message || 'Error al obtener materiales')
    },
  });

  return { data, isLoading, isError, refetch };
}

export default useAllMaterials;
