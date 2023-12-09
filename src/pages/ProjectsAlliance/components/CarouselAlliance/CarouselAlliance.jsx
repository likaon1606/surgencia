import useGetAlliance from '../../../../hooks/useGetAlliance'
import './CardAlliance.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Loader } from '@/components/ui/Loader/Loader'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  speed: 2500,
  autoplaySpeed: 2500,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
}

function CarouselAlliances() {
  const { data: alliances, isLoading, isError } = useGetAlliance()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <p>Error al cargar los proyectos</p>
  }

  return (
    <div className="my-5 mx-md-4">
      <Slider {...settings} className="sliderAlliance">
        {alliances?.map(alliance => (
          <a
            href={alliance.url}
            key={alliance.id}
            className="text-decoration-none h-100 card mb-2 p-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={alliance.allianceLogo} className="card-img-top" alt={alliance.name} />
            <h5 className="card-title text-center mt-3 mb-0">{alliance.name}</h5>
          </a>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselAlliances
