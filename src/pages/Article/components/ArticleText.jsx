import React from 'react';
import { Container } from 'react-bootstrap';

const ArticleText = ({ body }) => {
  return (
    <Container fluid className="text-justify mt-3">
      <p>
        {body}
      </p>
    </Container>
  );
};

export default ArticleText;