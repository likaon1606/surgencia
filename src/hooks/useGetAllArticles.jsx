import { useQuery } from 'react-query'
import { ArticleService } from '../services/article.service'

export const useGetAllArticles = (page, perPage = 9) => {
  return useQuery(['articles', page], () => ArticleService.getAllArticles(), {
    keepPreviousData: true,
    suspense: true,
  })
}