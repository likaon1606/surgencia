import React, { useState, useEffect } from 'react'
import RootLayout from '../../layouts/RootLayout'
import ButtonBack from '../../components/ui/ButtonBack'
import SearchBar from '../../components/ui/SearchBar'
import ArticleCard from './components/article-card/ArticleCard'
import PaginationComponent from '../../components/PaginationComponent'
import { useArticles } from '../../hooks/useArticles'

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: articles, isLoading, isError, refetch } = useArticles(currentPage)

  useEffect(() => {
    refetch()
  }, [currentPage])

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (isError) {
    return <p>Error al cargar los artículos</p>
  }

  const articlesList = articles.paginatedResults

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <RootLayout title="Blog" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <div className="d-flex justify-content-center pb-5 flex-wrap">
        <div className="d-flex flex-wrap justify-content-center pb-5">
          {Array.isArray(articlesList) &&
            articlesList.map((article, index) => (
              <ArticleCard
                key={index}
                style={`column ${index % 3 === 1 ? 'negative-margin' : ''}`}
                article={article}
              ></ArticleCard>
            ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <PaginationComponent
          totalPages={articles.pageCount}
          prevPage={prevPage}
          nextPage={nextPage}
          setPage={setCurrentPage}
          currentPage={articles.page}
        />
      </div>
    </RootLayout>
  )
}

export default Blog