import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CarouselCaption.css';

const ArticleCarousel = ({ postImages }) => {
  const showControls = postImages && postImages.length > 1;

  return (
    <Carousel className="rounded" data-bs-theme="dark" controls={showControls}>
      {postImages.map((image, index) => (
        <Carousel.Item key={index} style={{ height: '25em' }}>
          <img
            className="d-block w-100"
            src={image.imageUrl}
            alt={`Slide ${index + 1}`}
            style={{ objectFit: 'contain', objectPosition: 'center', maxHeight: '100%' }}
          />
          {image.description && (
            <Carousel.Caption className="custom-carousel-caption">
            <p>{image.description}</p>
          </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ArticleCarousel;