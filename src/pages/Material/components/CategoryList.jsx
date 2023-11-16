import { Link } from 'react-router-dom'
import useCategories from '@/hooks/useCategories'

export const CategoryList = () => {
  const { categories, isLoading } = useCategories()
  return (
    <div className="d-flex justify-content-center">
      <ul className="list-categories d-flex flex-row ">
        {!isLoading ? (
          categories?.map(c => {
            return (
              <Link className="category m-3" key={c.id} to={`/material/${c.slug}`}>
                {c.name}
              </Link>
            )
          })
        ) : (
          <div className="d-flex justify-content-center">Cargando...</div>
        )}
      </ul>
    </div>
  )
}
