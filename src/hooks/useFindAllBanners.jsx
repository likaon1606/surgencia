import { useQuery } from 'react-query'
import { BannerService } from '../services/banner.service'

const useFindAllBanners = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'banners',
    queryFn: () => BannerService.findAll(),
  })

  return {
    banners: data,
    isLoading,
  }
}

export default useFindAllBanners
