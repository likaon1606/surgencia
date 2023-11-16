import Carousel from 'react-bootstrap/Carousel'
import { useEffect } from 'react'
import useFindAllBanners from '../../../../hooks/useFindAllBanners'
import './HeroBannerSection.css'

const HeroBannerSection = () => {
  const { banners, isLoading } = useFindAllBanners()

  useEffect(() => {}, [banners])

  return (
    <Carousel className="carousel-container mt-md-3">
      {isLoading
        ? 'Cargando...'
        : banners?.map(banner => (
            <Carousel.Item key={banner.id}>
              <div className="carousel-image-container">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  loading="lazy"
                  onError={() => console.error(`Error al cargar la imagen para el banner con ID ${banner.id}`)}
                />
              </div>
              <Carousel.Caption className="caption-container">
                <h3 className="text-shadow text-uppercase">{banner.title}</h3>
                <p className="text-shadow mt-4">{banner.info}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
    </Carousel>
  )
}

export default HeroBannerSection
