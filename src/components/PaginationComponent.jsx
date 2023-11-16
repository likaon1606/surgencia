/* eslint-disable react/prop-types */
import Pagination from 'react-bootstrap/Pagination'

const PaginationComponent = ({ currentPage, totalPages, prevPage, nextPage, setPage }) => {
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <Pagination className="gap-2">
      <Pagination.Prev onClick={prevPage} disabled={!canGoPrev}>
        Anterior
      </Pagination.Prev>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={e => {
            e.preventDefault()
            setPage(index + 1)
          }}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={nextPage} disabled={!canGoNext}>
        Siguiente
      </Pagination.Next>
    </Pagination>
  )
}

export default PaginationComponent
