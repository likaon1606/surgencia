import { useQuery } from 'react-query'
import { ArticleService } from '../services/article.service'

export const useArticles = (page, perPage = 9) => {
  return useQuery(['articles', page], () => ArticleService.getArticles(page, perPage), {
    keepPreviousData: true,
  })
}
