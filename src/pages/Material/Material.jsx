import useMaterials from '../../hooks/useMaterials'
import RootLayout from '../../layouts/RootLayout'
import ButtonBack from '../../components/ui/ButtonBack'
import SearchBar from '../../components/ui/SearchBar'
import Breadcrumbs from '@/components/ui/Breadcrums'
import File from './components/File'
import { useState, useEffect } from 'react'
import PaginationComponent from '../../components/PaginationComponent'
import { CategoryList } from './components/CategoryList'
import { Loader } from '@/components/ui/Loader/Loader'

const Material = () => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Material Descargable' }]
  const [currentPage, setCurrentPage] = useState(1)

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const { data, isLoading, isError, refetch } = useMaterials(currentPage)
  const materials = data?.paginatedResults

  useEffect(() => {
    refetch()
  }, [currentPage])

  return (
    <RootLayout title="Quienes Somos" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <Breadcrumbs breadcrumbs={breadcrumbsData} />
      <CategoryList />
      {!isLoading && !isError ? (
        <>
          <div className="d-flex flex-row flex-wrap justify-content-center ">
            {materials?.map(m => {
              return (
                <File
                  className="d-flex justify-content-center"
                  key={m.id}
                  image={m.imagePreview}
                  title={m.title}
                  author={m.author}
                  externalUrl={m.externalUrl}
                ></File>
              )
            })}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <PaginationComponent
              totalPages={data?.pageCount}
              prevPage={prevPage}
              nextPage={nextPage}
              setPage={setCurrentPage}
              currentPage={data?.page}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </RootLayout>
  )
}

export default Material
