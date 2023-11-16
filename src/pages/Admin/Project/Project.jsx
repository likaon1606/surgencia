import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'

import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import useGetAllProjects from '../../../hooks/useGetAllProjects'

const AdminProject = () => {
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

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/project/add-project">
          {' '}
          <ButtonAdmin name="Agregar proyecto" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Proyectos</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <div className="mt-5">
        {projectsFiltered.slice(0, visibleProjects).map((project, id) => (
          <div key={id} className="p-2">
            <div className="">
              <p className="">{project.name}</p>
            </div>
            <div className="d-flex mt-3">
              <img
                className="rounded-circle"
                src={project.projectLogo}
                alt="Projects Image"
                style={{ width: '10em', height: '10em' }}
              />
              <div className="ml-5 p-3 d-flex justify-content-between align-items-start" style={{ width: '100%' }}>
                <div>
                  <p>{project.info}</p>
                  <p>{project.activityTitle}</p>
                  <p>{project.activityDescription}</p>
                  <p>{project.url}</p>
                  <p>Estado: {project.active ? 'Activo' : 'Inactivo'}</p>
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
