import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import toast from 'react-hot-toast'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import useGetAllProjects from '../../../hooks/useGetAllProjects'
import { ProjectsService } from '../../../services'

const AdminProject = () => {
  const navigate = useNavigate()
  const { data: projects, isLoading, isError } = useGetAllProjects()

  const [filter, setFilter] = useState('')
  const [visibleProjects, setVisibleProjects] = useState(3)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const projectsFiltered = projects.filter(project => project.name.toLowerCase().includes(filter.toLowerCase()))

  const handleLoadMore = () => {
    setVisibleProjects(prevVisibleProjects => prevVisibleProjects + 3)
  }

  const handleEditAlliance = id => navigate('edit-project/' + id)

  const confirmDelete = async (id, name) => {
    const status = window.confirm(`¿Estás seguro de eliminar el proyecto "${name}"?`)
    if (status) {
      await toast.promise(ProjectsService.remove(id), {
        loading: 'Eliminando...',
        success: (
          <p>
            Proyecto <b>{name}</b> eliminado con éxito
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
        <Link to="/admin/project/add-project">
          <ButtonAdmin name="Agregar proyecto" backgroundColor="black" />
        </Link>
      </div>
      <h1 className="mt-3">Proyectos</h1>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
            {projectsFiltered.slice(0, visibleProjects).map(project => (
              <tr key={project.id}>
                <td>
                  <img
                    className="rounded-circle"
                    src={project.projectLogo}
                    alt="Projects Image"
                    style={{ width: '7em', height: '7em' }}
                  />
                </td>
                <td>
                  <p className="label">Nombre de Proyecto:</p>
                  <h6 className="value">{project.name}</h6>
                </td>
                <td>
                  <p className="label">Titulo:</p>
                  <h6 className="value">{project.activityTitle}</h6>
                </td>
                <td>
                  <p className="label">Descripción: </p>
                  <h6 className="value">{project.activityDescription}</h6>
                </td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <p className="label">URL: </p>
                  <h6 className="value">{project.url}</h6>
                </td>
                <td>
                  <p className="label">Estado</p>
                  <h6 className="value">{project.active ? 'Activo' : 'Inactivo'}</h6>
                </td>
                <td>
                  <div className="d-flex flex-column gap-1 px-2">
                    <button className="btn btn-primary" onClick={() => handleEditAlliance(project.id)} style={{ width: '3em' }}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger" onClick={() => confirmDelete(project.id, project.name)} style={{ width: '3em' }}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {projectsFiltered.length > visibleProjects && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminProject
