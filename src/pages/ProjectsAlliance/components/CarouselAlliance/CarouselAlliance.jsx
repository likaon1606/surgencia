import useGetAlliance from '../../../../hooks/useGetAlliance'
import './CardAlliance.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function CarouselAlliances() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  }

  const { data: alliances, isLoading, isError } = useGetAlliance()

  useEffect(() => {}, [alliances])

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (isError) {
    return <p>Error al cargar los proyectos</p>
  }

  return (
    <div className="m-5">
      <Slider {...settings}>
        {alliances?.map((alliance, i) => (
          <div key={i} className="col">
            <div className="card">
              <img src={alliance.allianceLogo} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{alliance.name}</h5>
                {alliance.url && (
                  <Link to="*" className="text-decoration-none text-white">
                    {alliance.url}
                  </Link>
                )}
              </div>
              <div className="d-flex justify-content-evenly p-4"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselAlliances
