import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import toast from 'react-hot-toast'
import useGetAllMembers from '../../../hooks/useGetAllMembers'
import { MemberService } from '../../../services'

const AdminAbout = () => {
  const navigate = useNavigate()

  const { data: members, isLoading, isError, refetch } = useGetAllMembers()

  const [filter, setFilter] = useState('')
  const [visibleMembers, setVisibleMembers] = useState(3)

  const handleEditMember = id => navigate('edit-member/' + id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const removeMember = async (id, name, lastName) => {
    const status = window.confirm(`¿Estás seguro de eliminar el miembro "${name} ${lastName}"?`)
    if (status) {
      await toast.promise(MemberService.remove(id), {
        loading: 'Eliminando...',
        success: (
          <p>
            Miembro <b>{name} {lastName}</b> eliminado con éxito
          </p>
        ),
        error: err => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
      })
      refetch()
    }
  }

  const membersFiltered = members.filter(member => member.firstName.toLowerCase().includes(filter.toLowerCase()))

  const handleLoadMore = () => {
    setVisibleMembers(prevVisibleMembers => prevVisibleMembers + 3)
  }

  return (
    <div className="mt-2 p-2 p-md-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/about/add-member">
          <ButtonAdmin name="Agregar miembro" backgroundColor="black" />
        </Link>
      </div>
      <h1 className="mt-3">Miembros ONG</h1>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>

      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
            {membersFiltered.slice(0, visibleMembers).map(member => (
              <tr key={member.id}>
                <td>
                  <img
                    className="rounded-circle"
                    src={member.imageUrl}
                    alt="Member's Image"
                    style={{ width: '7em', height: '7em' }}
                  />
                </td>
                <td>
                  <p className="label">Miembro</p>
                  <h6 className="value">
                    {member.firstName} {member.lastName}
                  </h6>
                </td>
                <td>
                  <p className="label">Descripción</p>
                  <div dangerouslySetInnerHTML={{ __html: member.info.substring(0, 30) }} />
                </td>
                <td>
                  <p className="label">Estado</p>
                  <h6 className="value">{member.active ? 'Activo' : 'Inactivo'}</h6>
                </td>
                <td>
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-primary" style={{ width: '3em' }} onClick={() => handleEditMember(member.id)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger" style={{ width: '3em' }} onClick={() => removeMember(member.id, member.firstName, member.lastName)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>{membersFiltered.length > visibleMembers && (
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