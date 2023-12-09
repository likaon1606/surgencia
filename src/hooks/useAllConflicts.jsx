import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import {ConflictService} from "../services/conflicts.service"

const useAllConflicts = () => {
    return useQuery('conflict', ConflictService.findAllConflict, {
      onError: error => {
        toast.error(error?.message || 'Error al obtener conflictos')
      },
    })
  }
  
  export default useAllConflicts