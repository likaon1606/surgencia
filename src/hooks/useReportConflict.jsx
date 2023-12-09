import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

import { ReportConflict } from '../services/report-conflict.service'

const useReportConflict = () => {
  const navigate = useNavigate()

  return useMutation(ReportConflict.create, {
    onSuccess: () => {
      toast.success('Reporte creado, la información será validada por el equipo antes deser publicada')
      setTimeout(() => {
      navigate('/conflict')
    }, 2000);
    },
    onError: error => {
      toast.error(error?.message || 'Ha ocurrido un error. Recuerde que debe seleccionar un punto en el mapa')
    },
  })
}

export default useReportConflict
