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
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
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
    <div className="my-5">
      <Slider {...settings} className='sliderConflict'>
        {isLoading
          ? 'Cargando...'
          : conflict?.map(conflict => (
              <Card key={conflict.id} className="text-white shadow-sm">
                <Card.Img src={conflict.imageUrl} alt="Card image" style={{ height: '28rem' }} />
                <Card.ImgOverlay style={{ background: 'rgba(0, 0, 0, 0.5)', width: '100%', margin: 0 }}>
                  <div className=" d-flex flex-column justify-content-end h-100">
                    <Card.Title className="fw-bold">{conflict.title}</Card.Title>
                  </div>
                </Card.ImgOverlay>
              </Card>
            ))}
      </Slider>
    </div>
  )
}

export default CarouselConflicts
