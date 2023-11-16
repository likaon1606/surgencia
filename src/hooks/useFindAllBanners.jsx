import { useQuery } from 'react-query'
import { BannerService } from '../services/banner.service'

const useFindAllBanners = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'banners',
    queryFn: () => BannerService.findAll(),
    initialData: [
      {
        id: 'f383e6e5-0157-4c07-8aa1-4f360ff9a045',
        title: 'SURGENCIA ONG',
        info: 'Poniendo en valor nuestro patrimonio marino-costero.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=14V0AmuH9eBlNmV_AINdkQ1aRPGIARA8l',
      },
      {
        id: 'f861e9f4-dbf4-479a-9359-f87a90dc790b',
        title: 'SURGENCIA ONG',
        info: 'Poniendo en valor nuestro patrimonio marino-costero.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1W_rwoLovR20aFFJ-EEQuAU4GenTNh2zJ',
      },
      {
        id: '026fd5d8-3ad4-435d-9ceb-465b5abde550',
        title: 'SURGENCIA ONG',
        info: 'Poniendo en valor nuestro patrimonio marino-costero.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1VBnHCm-Unu_zui8WZytiQagTm22O9kkj',
      },
    ],
  })

  return {
    banners: data,
    isLoading,
  }
}

export default useFindAllBanners
