import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import useGetAllAlliance from '../../../hooks/useGetAllAlliance'

const AdminAlliance = () => {
  const { data: alliances, isLoading, isError } = useGetAllAlliance()

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

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/alliance/add-alliance">
          {' '}
          <ButtonAdmin name="Agregar alianza" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Alianzas</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <div className="mt-5">
        {alliancesFiltered.slice(0, visibleAlliances).map((alliance, id) => (
          <div key={id} className="p-2">
            <div className="">
              <p className="">{alliance.name}</p>
            </div>
            <div className="d-flex mt-3">
              <img
                className="rounded-circle"
                src={alliance.allianceLogo}
                alt="Alliances Image"
                style={{ width: '10em', height: '10em' }}
              />
              <div className="ml-5 p-3 d-flex justify-content-between align-items-start" style={{ width: '100%' }}>
                <div>
                  <p>{alliance.url}</p>
                  <p>Estado: {alliance.active ? 'Activo' : 'Inactivo'}</p>
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
