import { NavLink } from 'react-router-dom'
import useCategories from '@/hooks/useCategories'

export const CategoryList = () => {
  const { categories } = useCategories()
  return (
    <ul className="d-flex flex-wrap justify-content-center gap-3 px-0">
      {categories?.map(c => {
        return (
          <NavLink
            key={c.id}
            to={`/material/${c.slug}`}
            className={({ isActive }) =>
              `fs-5 fw-bold px-3 py-2 text-muted rounded-pill shadow ${isActive ? 'bg-warning' : 'bg-info'}`
            }
          >
            {c.name}
          </NavLink>
        )
      })}
    </ul>
  )
}
