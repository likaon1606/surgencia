import { useQuery } from 'react-query'
import { CategoryService } from '../services/category.service'

const useCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'categories',
    queryFn: () => CategoryService.getCategories(),
  })
  return { categories: data, isLoading }
}

export default useCategories
