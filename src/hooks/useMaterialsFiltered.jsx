import { useQuery } from 'react-query'
import { MaterialService } from '../services/material.service'

const useMaterialsFiltered = (page,id) => {
  return useQuery({
    queryKey:"materialsFiltered",
    queryFn: () => MaterialService.getMaterialsFiltered(page,id)
  })
}

export default useMaterialsFiltered