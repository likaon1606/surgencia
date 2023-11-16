import { useQuery } from 'react-query'
import { ArticleService } from '../services/article.service'

export const useArticles = page => {
  return useQuery(['articles', page], () => ArticleService.getArticles(page), {
    keepPreviousData: true,
    suspense: true,
  })
}
