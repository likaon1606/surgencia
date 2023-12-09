import RootLayout from '../../layouts/RootLayout'
import ButtonBack from '../../components/ui/ButtonBack'
import SearchBar from '../../components/ui/SearchBar'
import Breadcrumbs from '@/components/ui/Breadcrums'
import File from './components/File'
import { useParams } from 'react-router-dom'
import useMaterialsByCategorySlug from '../../hooks/useMaterialsByCategorySlug'
import { useState, useEffect } from 'react'
import PaginationComponent from '../../components/PaginationComponent'
import { CategoryList } from './components/CategoryList'

const FilteredMaterial = () => {
  let { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const breadcrumCategory = id.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())
  const breadcrumbsData = [
    { name: 'Inicio', url: '/' },
    { name: 'Material Descargable', url: '/material' },
    { name: `${breadcrumCategory}` },
  ]

  const { data, isLoading, isError } = useMaterialsByCategorySlug(id, currentPage)
  const materials = data?.paginatedResults

  useEffect(() => {
    // Reset currentPage to 1 when the category changes
    setCurrentPage(1)
  }, [id])

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <RootLayout title="Quienes Somos" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <Breadcrumbs breadcrumbs={breadcrumbsData} />
      <CategoryList />
      {!isLoading && !isError ? (
        <div className="d-flex flex-row flex-wrap justify-content-center">
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
      ) : (
        <div className="d-flex justify-content-center">Cargando...</div>
      )}
      <div className="d-flex justify-content-center mt-5">
        <PaginationComponent
          totalPages={data?.pageCount}
          prevPage={prevPage}
          nextPage={nextPage}
          setPage={setCurrentPage}
          currentPage={data?.page}
        />
      </div>
    </RootLayout>
  )
}

export default FilteredMaterial
