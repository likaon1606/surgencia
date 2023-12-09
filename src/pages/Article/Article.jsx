import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import RootLayout from '../../layouts/RootLayout'
import useArticleData from '../../hooks/useArticleData'
import ArticleHeader from './components/ArticleHeader'
import ArticleText from './components/ArticleText'
import ArticleCarousel from './components/ArticleCarousel'
import CardBusiness from './components/CardBusiness'
import CardArticle from './components/Cards'
import './Article.css'
import { Loader } from '@/components/ui/Loader/Loader'

const ArticleDetail = () => {
  const { id } = useParams()
  const { data, loading, error } = useArticleData(id)

  if (loading || !data?.post) {
    return <Loader />
  }

  if (error) {
    return <p>Error al cargar la información: {error}</p>
  }

  const { title, imageUrl, body, User, Tags, PostImages, createdAt } = data.post
  const { firstName, lastName } = User
  const tags = Tags.map(tags => tags.name)
  const postImages = PostImages.map(image => ({
    imageUrl: image.imageUrl,
    description: image.description,
  }))

  return (
    <RootLayout>
      <ArticleHeader title={title} date={createdAt} />
      <Container>
        <Container fluid>
          <div className="text-center mt-3">
            <img src={imageUrl} alt="Imagen del artículo del blog" className="img-fluid rounded main-img" />
          </div>
        </Container>
        <Container>
          <ArticleText body={body} />
        </Container>
        <Container>
          <ArticleCarousel postImages={postImages} />
        </Container>
        <Container fluid className="mt-3">
          <div className="d-flex flex-wrap align-items-center justify-content-center pb-5">
            <p className="bold-text my-0 mx-3">Tags: </p>
            {tags.map(tag => (
              <span key={tag} className="mx-2 tag">
                {tag}
              </span>
            ))}
          </div>
        </Container>
        <Container fluid className="mt-3">
          <CardBusiness name={firstName} lastName={lastName} />
        </Container>
        <Container fluid className="mt-3">
          <h4 className="bold-text mt-4 text-center">Entradas relacionadas</h4>
          <div className="d-flex flex-wrap justify-content-center pb-5">
            {data.relatedPosts.length > 0 ? (
              data.relatedPosts.map(similarArticle => (
                <CardArticle key={similarArticle.id + id} article={similarArticle} />
              ))
            ) : (
              <p>No hay artículos similares disponibles.</p>
            )}
          </div>
        </Container>
      </Container>
    </RootLayout>
  )
}

export default ArticleDetail
