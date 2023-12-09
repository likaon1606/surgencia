import { useQuery } from 'react-query'
import { BannerService } from '../services/banner.service'

const useAllBanners = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: 'banners',
    queryFn: () => BannerService.getAllBanners(),
  })

  return {
    banners: data,
    isLoading,
    isError,
    refetch
  }
}

export default useAllBanners