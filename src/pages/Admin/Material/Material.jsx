import { useState } from 'react'
import useMaterials from '../../../hooks/useMaterials'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'

const AdminMaterial = () => {
  const { data: materials, isLoading, isError } = useMaterials()

  const [filter, setFilter] = useState('')
  const [visibleMaterials, setVisibleMaterials] = useState(3)

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <div>Error al cargar los materiales.</div>
  }

  const materialsFiltered = materials.paginatedResults.filter(material =>
    material.title.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleLoadMore = () => {
    setVisibleMaterials(prevVisibleMaterials => prevVisibleMaterials + 3)
  }

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/material/add-material">
          <ButtonAdmin name="Agregar Material" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Materiales Descargables</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <div className="mt-5">
        {materialsFiltered.slice(0, visibleMaterials).map((material, id) => (
          <div key={id} className="p-2">
            <div className="">
              <p className="">
                {material.Category.name} - {material.title}
              </p>
            </div>
            <div className="d-flex mt-3">
              <div className="ml-5 p-3 d-flex justify-content-between align-items-start" style={{ width: '100%' }}>
                <div>
                  <p>{material.title}</p>
                  <p>{material.title}</p>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <button className="btn" style={{ width: '1em' }}>
                    <FaTrash />
                  </button>
                  <button className="btn" style={{ width: '1em' }}>
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {materialsFiltered.length > visibleMaterials && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminMaterial
