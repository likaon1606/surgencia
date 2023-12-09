import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { ReportConflict } from '../services/report-conflict.service'

const useGetAllReports = () => {
  return useQuery('reports', ReportConflict.findAll, {
    onError: error => {
      toast.error(error?.message || 'Error al obtener conflictos')
    },
  })
}

export default useGetAllReports
