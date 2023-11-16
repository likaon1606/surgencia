import { useQuery } from 'react-query'
import { MaterialService } from '../services/material.service'

const useMaterialsByCategorySlug = (slug, page) => {
  return useQuery({
    queryKey: ['materials/slug', slug, page],
    queryFn: () => MaterialService.getMaterialsByCategorySlug(slug, page),
  })
}

export default useMaterialsByCategorySlug
