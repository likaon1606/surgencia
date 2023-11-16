import React from 'react';
import { Carousel } from 'react-bootstrap';

const ArticleCarousel = () => {
  return (
    <Carousel className="rounded">
      <Carousel.Item style={{ height: '25em' }}>
        <img
          className="d-block w-100"
          src="https://www.costacruceros.com/content/dam/costa/costa-magazine/article-images/chile-beaches/playa-la-virgen.jpg.image.1296.974.high.jpg"
          alt="First slide"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: '25em' }}>
        <img
          className="d-block w-100"
          src="https://radio.uchile.cl/wp-content/uploads/2021/10/Punta-de-Choros.jpg"
          alt="Second slide"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: '25em' }}>
        <img
          className="d-block w-100"
          src="https://media-front.elmostrador.cl/2017/08/reserva_pinguino_humbolt.jpg"
          alt="Third slide"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ArticleCarousel;