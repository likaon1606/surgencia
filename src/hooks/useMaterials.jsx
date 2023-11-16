import { useQuery } from 'react-query'
import { MaterialService } from '../services/material.service'

const useMaterials = (page) => {
  return useQuery({
    queryKey:"materials",
    queryFn: () => MaterialService.getMaterials(page)
  })
}

export default useMaterials