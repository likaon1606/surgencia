import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import './ArticleCard.css'

const CardArticle = props => {
  const { title, imageUrl, body, createdAt, id } = props.article
  const dateObject = new Date(createdAt)
  const formattedDate = dateObject.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const limitedBody = body.length > 100 ? `${body.slice(0, 100)}...` : body
  const sanitizedBody = DOMPurify.sanitize(limitedBody, {
    ALLOWED_TAGS: ['p'],
  })

  const handleScrollTop = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    handleScrollTop()
  }, [id])

  return (
    <div className={`article-card ${props.style}`}>
      <img src={imageUrl} alt="articleCard" />
      <div className="info">
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
        <p className="date">Creado {formattedDate}</p>
        <Link to={`/blog/${id}`} className="button" onClick={handleScrollTop}>
          Leer más {'>'}
        </Link>
      </div>
    </div>
  )
}

export default CardArticle
