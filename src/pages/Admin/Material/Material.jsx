import { useState } from 'react'
import useAllMaterials from '../../../hooks/useAllMaterials'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import { useDeleteMaterial } from '../../../hooks/useDeleteMaterial'
import ConfirmModal from '@/components/ui/ConfirmModal'

const AdminMaterial = () => {
  const { data: materials, isLoading, isError } = useAllMaterials()
  const { showConfirmModal, removeMaterial, handleClose, confirmDelete } = useDeleteMaterial()

  const [filter, setFilter] = useState('')
  const [visibleMaterials, setVisibleMaterials] = useState(3)

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <div>Error al cargar los materiales.</div>
  }

  const materialsFiltered = materials.filter(material =>
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
      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
            {materialsFiltered.slice(0, visibleMaterials).map((material, id) => (
              <tr key={id}>
                <td>
                  <img
                    className="rounded-circle"
                    src={material.imagePreview}
                    alt="(Material Image)"
                    style={{ width: '7em', height: '7em' }}
                  />
                </td>
                <td>
                  <p className="label">Titulo</p>
                  <h6 className="value">{material.title}</h6>
                </td>
                <td>
                  <p className="label">Categoría</p>
                  <h6 className="value">{material.Category.name}</h6>
                </td>
                <td>
                  <p className="label">Descripción</p>
                  <div className="value" dangerouslySetInnerHTML={{ __html: material.description.substring(0, 30) }} />
                </td>
                <td>
                  <p className="label">Autor</p>
                  <p className="value">{material.author}</p>
                </td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <p className="label">URL</p>
                  <h6 className="value">
                    {material.externalUrl}
                  </h6>
                </td>
                <td>
                  <p className="label">Estado</p>
                  <p className="value">{material.active ? 'Activo' : 'Inactivo'}</p>
                </td>
                <td>
                  <div className="d-flex flex-column gap-2 button-container">
                    <Link to={`/admin/material/edit-material/${material.id}`}>
                      <button className="btn btn-primary" style={{ width: '3em' }}>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      style={{ width: '3em' }}
                      onClick={() => removeMaterial(material)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {materialsFiltered.length > visibleMaterials && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}

      <ConfirmModal show={showConfirmModal} handleClose={handleClose} handleConfirm={confirmDelete} />
    </div>
  )
}

export default AdminMaterial
