import React, { useState, useEffect } from 'react'
import RootLayout from '../../layouts/RootLayout'
import ArticleCard from './components/article-card/ArticleCard'
import PaginationComponent from '../../components/PaginationComponent'
import { useArticles } from '../../hooks/useArticles'
import Breadcrumbs from '@/components/ui/Breadcrums'
import { Loader } from '@/components/ui/Loader/Loader'

const Blog = () => {
  const breadcrumbsData = [
    { name: 'Inicio', url: '/' },
    { name: 'Noticias', url: '/blog' },
  ]
  const [currentPage, setCurrentPage] = useState(1)
  const { data: articles, isLoading, isError, refetch } = useArticles(currentPage)

  useEffect(() => {
    refetch()
  }, [currentPage])

  const articlesList = articles?.paginatedResults

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <RootLayout title="Blog">
      <div className="breadcrumb">
        <Breadcrumbs breadcrumbs={breadcrumbsData} />
      </div>
      {isLoading && (
        <div className="py-5">
          <Loader showLogo={false} />
        </div>
      )}
      {isError && <p>Ocurrio un error al cargar los artículos</p>}

      <div className="d-flex flex-wrap justify-content-center pb-5">
        {Array.isArray(articlesList) &&
          articlesList?.map(article => <ArticleCard key={article.id} article={article}></ArticleCard>)}
      </div>
      {articles && (
        <div className="d-flex justify-content-center mt-5">
          <PaginationComponent
            totalPages={articles?.pageCount}
            prevPage={prevPage}
            nextPage={nextPage}
            setPage={setCurrentPage}
            currentPage={articles?.page}
          />
        </div>
      )}
    </RootLayout>
  )
}

export default Blog
