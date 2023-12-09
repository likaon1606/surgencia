import { Card } from 'react-bootstrap'
import Slider from 'react-slick'
import useGetProjects from '@/hooks/useGetProjects'
import './CardProject.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Loader } from '@/components/ui/Loader/Loader'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  speed: 2500,
  autoplaySpeed: 3000,
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

function CarouselProjects() {
  const { data: projects, isLoading, isError } = useGetProjects()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <p>Error al cargar los proyectos</p>
  }

  return (
    <div className="mb-5">
      <Slider {...settings} className="sliderProjects">
        {projects?.map(pj => (
          <a href={pj.url} key={pj.id} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            <Card className="text-white shadow-sm">
              <Card.Img src={pj.projectLogo} alt="Card image" style={{ height: '28rem' }} />
              <Card.ImgOverlay style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100%' }}>
                <div className=" d-flex flex-column justify-content-end h-100">
                  <Card.Title className="fw-bold">{pj.activityTitle}</Card.Title>
                  <Card.Text>{pj.activityDescription}</Card.Text>
                </div>
              </Card.ImgOverlay>
            </Card>
          </a>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselProjects
