import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import toast from 'react-hot-toast'
import useGetUsers from '../../../hooks/useGetUsers'
import { AdministratorService } from '../../../services'

const AdminUsers = () => {

  const { data: users, isLoading, isError, refetch } = useGetUsers()

  const [filter, setFilter] = useState('')
  const [visibleUsers, setVisibleUsers] = useState(3)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const usersFiltered = users.filter(user => user.firstName.toLowerCase().includes(filter.toLowerCase()))

  const handleLoadMore = () => {
    setVisibleUsers(prevVisibleUsers => prevVisibleUsers + 3)
  }

  const confirmDelete = async (id, name, lastName) => {
    const status = window.confirm(`¿Estás seguro de eliminar el administrador "${name} ${lastName}"? Una vez eliminado, no se podrá recuperar`)
    if (status) {
      await toast.promise(AdministratorService.remove(id), {
        loading: 'Eliminando...',
        success: (
          <p>
            Administrador <b>{name} {lastName}</b> eliminado con éxito
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
        <Link to="/admin/dashboard/add-administrator">
          {' '}
          <ButtonAdmin name="Agregar Administrador" backgroundColor="black" />
        </Link>
      </div>
      <h1 className="mt-3">Lista de Administradores</h1>      
      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
            {usersFiltered.slice(0, visibleUsers).map(user => (
              <tr key={user.id}>
                <td>
                  <p className="label">Nombre:</p>
                  <h6 className="value">{user.firstName} {user.lastName}</h6>
                </td>
                <td>
                  <p className="label">E-Mail: </p>
                  <h6 className="value">{user.email}</h6>
                </td>
                <td>
                  <p className="label">Estado</p>
                  <h6 className="value">{user.active ? 'Activo' : 'Inactivo'}</h6>
                </td>
                <td>
                  <p className="label">Super Administrador:</p>
                  <h6 className="value">{user.isAdmin ? 'Si' : 'No'}</h6>
                </td>
                <td>
                  <div className="d-flex flex-column gap-1 px-2">
                    <button className="btn btn-danger" onClick={() => confirmDelete(user.id, user.firstName, user.lastName)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {usersFiltered.length > visibleUsers && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
