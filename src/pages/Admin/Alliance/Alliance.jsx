import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import toast from 'react-hot-toast'
import useGetAllAlliance from '../../../hooks/useGetAllAlliance'
import { AllianceService } from '../../../services'

const AdminAlliance = () => {
  const navigate = useNavigate()

  const { data: alliances, isLoading, isError, refetch } = useGetAllAlliance()

  const [filter, setFilter] = useState('')
  const [visibleAlliances, setVisibleAlliances] = useState(3)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const alliancesFiltered = alliances.filter(alliance => alliance.name.toLowerCase().includes(filter.toLowerCase()))

  const handleLoadMore = () => {
    setVisibleAlliances(prevVisibleAlliances => prevVisibleAlliances + 3)
  }

  const handleEditAlliance = id => navigate('edit-alliance/' + id)

  const confirmDelete = async (id, name) => {
    const status = window.confirm(`¿Estás seguro de eliminar la alianza "${name}"?`)
    if (status) {
      await toast.promise(AllianceService.remove(id), {
        loading: 'Eliminando...',
        success: (
          <p>
            Alianza <b>{name}</b> eliminada con éxito
          </p>
        ),
        error: err => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
      })
      refetch()
    }
  }

  return (
    <div className="mt-2 p-2 p-md-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/alliance/add-alliance">
          <ButtonAdmin name="Agregar alianza" backgroundColor="black" />
        </Link>
      </div>
      <h1 className="mt-3">Alianzas</h1>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
            {alliancesFiltered.slice(0, visibleAlliances).map(alliance => (
              <tr key={alliance.id}>
                <td>
                  <img
                    className="rounded-circle"
                    src={alliance.allianceLogo}
                    alt="Alliances's Image"
                    style={{ width: '7em', height: '7em' }}
                  />
                </td>
                <td>
                  <p className="label">Nombre de Alianza:</p>
                  <h6 className="value">{alliance.name}</h6>
                </td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <p className="label">URL: </p>
                  <h6 className="value">{alliance.url}</h6>
                </td>
                <td>
                  <p className="label">Estado</p>
                  <h6 className="value">{alliance.active ? 'Activo' : 'Inactivo'}</h6>
                </td>
                <td>
                  <div className="d-flex flex-column gap-1 px-2">                    
                    <button className="btn btn-primary" onClick={() => handleEditAlliance(alliance.id)} style={{ width: '3em' }}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger" onClick={() => confirmDelete(alliance.id, alliance.name)} style={{ width: '3em' }}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {alliancesFiltered.length > visibleAlliances && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminAlliance
