import useGetProjects from '../../../../hooks/useGetProjects'
import './CardProject.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CarouselProjects() {
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
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  }

  const { data: projects, isLoading, isError } = useGetProjects()
  useEffect(() => {}, [projects])

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (isError) {
    return <p>Error al cargar los proyectos</p>
  }

  return (
    <div className="ms-5 me-5 mb-5">
      <Slider {...settings}>
        {projects?.map((pj, i) => (
          <Card key={i} className="text-white shadow-sm" style={{ width: '18rem' }}>
            <Card.Img src={pj.projectLogo} alt="Card image" style={{ height: '28rem' }} />
            <Card.ImgOverlay style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100%' }}>
              <div className=" d-flex flex-column justify-content-end h-100">
                <Card.Title className="fw-bold">{pj.activityTitle}</Card.Title>
                <Card.Text>{pj.activityDescription}</Card.Text>
                {pj.link && (
                  <Link to="*" className="text-decoration-none text-white">
                    Quiero saber más
                  </Link>
                )}
              </div>
            </Card.ImgOverlay>
          </Card>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselProjects
