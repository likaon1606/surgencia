import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'

import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import useGetMembers from '../../../hooks/useGetMembers'

const AdminAbout = () => {
  const { data: members, isLoading, isError } = useGetMembers()

  const [filter, setFilter] = useState('')
  const [visibleMembers, setVisibleMembers] = useState(3)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const membersFiltered = members.filter(member => member.firstName.toLowerCase().includes(filter.toLowerCase()))

  const handleLoadMore = () => {
    setVisibleMembers(prevVisibleMembers => prevVisibleMembers + 3)
  }

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/about/add-member">
          {' '}
          <ButtonAdmin name="Agregar miembro" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Miembros ONG</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <div className="mt-5">
        {membersFiltered.slice(0, visibleMembers).map((member, id) => (
          <div key={id} className="p-2">
            <div className="">
              <p className="">
                {member.firstName} {member.lastName}
              </p>
            </div>
            <div className="d-flex mt-3">
              <img
                className="rounded-circle"
                src={member.imageUrl}
                alt="Member's Image"
                style={{ width: '10em', height: '10em' }}
              />
              <div className="ml-5 p-3 d-flex justify-content-between align-items-start" style={{ width: '100%' }}>
                <div>
                  <p>{member.position}</p>
                  <p>{member.info}</p>
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

      {membersFiltered.length > visibleMembers && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminAbout
