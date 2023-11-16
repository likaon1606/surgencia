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

const ArticleDetail = () => {
  const { id } = useParams()
  const { notices, loading, error } = useArticleData()
  const threeArticles = notices.slice(0, 3)

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error al cargar la información: {error}</p>
  }

  const article = notices.find(item => item.id === id)

  if (!article) {
    return <p>No se encontró el artículo con el ID: {id}</p>
  }

  const { title, imageUrl, body, User, Tags } = article
  const { firstName, lastName } = User

  // Step 1: Get the tag of the current article
  const currentTag = Tags.length > 0 ? Tags[0].name : null

  // Step 2: Filter other articles with the same tag
  const similarArticles = notices.filter(
    otherArticle =>
      otherArticle.id !== id && // Exclude the current article
      otherArticle.Tags.some(tag => tag.name === currentTag), // At least one common tag
  )

  // Step 3: Display 3 similar articles randomly
  const randomSimilarArticles =
    similarArticles.length > 3 ? similarArticles.sort(() => 0.5 - Math.random()).slice(0, 3) : similarArticles

  // Additional step: Ensure that the current article is not present in the list of similar articles
  const filteredSimilarArticles = randomSimilarArticles.filter(similarArticle => similarArticle.id !== id)

  return (
    <RootLayout>
      <ArticleHeader title={article.title} />
      <Container>
        <Container fluid>
          <div className="text-center mt-3">
            <img src={article.imageUrl} alt="Imagen del artículo del blog" className="img-fluid rounded" />
          </div>
        </Container>
        <Container>
          <ArticleText body={article.body} />
        </Container>
        <Container>
          <ArticleCarousel />
        </Container>
        <Container fluid className="mx-4 mt-3">
          <div>
            <p className="bold-text mt-4 mx-3">Autor del post</p>
          </div>
          <CardBusiness
            name={firstName}
            lastName={lastName}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            image="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </Container>
        <Container fluid className="mx-4 mt-3">
          <div>
            <p className="bold-text mt-4 mx-3">Entradas relacionadas</p>
          </div>
          <div className="d-flex justify-content-center pb-5">
            <div className="d-flex flex-wrap justify-content-center pb-5">
              {/* Mostrar 3 artículos similares sin repetir el actual */}
              {filteredSimilarArticles.slice(0, 3).map(similarArticle => (
                <CardArticle key={similarArticle.id} article={similarArticle} />
              ))}
            </div>
          </div>
        </Container>
      </Container>
    </RootLayout>
  )
}

export default ArticleDetail
