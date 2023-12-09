import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import './ArticleCard.css'

const ArticleCard = props => {
  const { title, imageUrl, body, createdAt, id } = props.article
  const dateObject = new Date(createdAt)
  const formattedDate = dateObject.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const limitedBody = body.length > 150 ? `${body.slice(0, 150)}...` : body
  const sanitizedBody = DOMPurify.sanitize(limitedBody, {
    ALLOWED_TAGS: ['p'],
  })

  return (
    <article className={`article-card column col-4 position-relative`}>
      <img src={imageUrl} alt="articleCard" className="img-fluid" />
      <div className="info ">
        <h3 className='overflow-hidden'>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
        <div className='info-fake'></div>
      </div>
      <div className='position-absolute bottom-0 m-3 '>
      <p className="date">Creado {formattedDate}</p>
        <Link to={`/blog/${id}`} className="button">
          Leer más {'>'}
        </Link>
      </div>
    </article>
  )
}

export default ArticleCard
