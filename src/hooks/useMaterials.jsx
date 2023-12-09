import { useQuery } from 'react-query'
import { MaterialService } from '../services/material.service'

const useMaterials = (page, perPage = 9) => {
  return useQuery({
    queryKey:"materials",
    queryFn: () => MaterialService.getMaterials(page, perPage)
  })
}

export default useMaterials