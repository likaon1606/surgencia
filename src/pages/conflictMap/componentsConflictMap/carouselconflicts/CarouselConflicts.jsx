import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './CarouselConflicts.css'
import useConflicts from '../../../../hooks/useConflicts'

const CarouselConflicts = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const { conflict, isLoading } = useConflicts()
  useEffect(() => {}, [conflict])

  return (
    <div className="m-5">
      <Slider {...settings}>
        {isLoading
          ? 'Cargando...'
          : conflict?.map(conflict => (
              <Card key={conflict.id} className="text-white shadow-sm" style={{ width: '18rem' }}>
                <Card.Img src={conflict.imageUrl} alt="Card image" style={{ height: '28rem' }} />
                <Card.ImgOverlay style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100%' }}>
                  <div className=" d-flex flex-column justify-content-end h-100">
                    <Card.Title className="fw-bold">{conflict.title}</Card.Title>
                    <Link to="*" className="text-decoration-none text-white">
                      Quiero saber más
                    </Link>
                  </div>
                </Card.ImgOverlay>
              </Card>
            ))}
      </Slider>
    </div>
  )
}

export default CarouselConflicts
