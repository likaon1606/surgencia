import React from 'react';
import { Container } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const ArticleText = ({ body }) => {
  const sanitizedBody = DOMPurify.sanitize(body);
  return (
    <Container fluid className="text-justify mt-3">
      <div dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
    </Container>
  );
};

export default ArticleText;