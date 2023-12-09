import React from 'react'
import { Link } from 'react-router-dom'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import useAllConflicts from '../../../hooks/useAllConflicts'
import useGetAllReports from '@/hooks/useGetAllReports'
import useAuthStore from '../../../store/useAuthStore'
import './DashBoard.css'

const DashBoard = () => {
  const { data: reports, isLoading: reportsLoading, isError: reportsError } = useGetAllReports()
  const { data: conflicts, isLoading: conflictsLoading, isError: conflictsError } = useAllConflicts()
  const { user } = useAuthStore();

  if (reportsLoading || conflictsLoading) {
    return <p>Loading...</p>
  }

  if (reportsError || conflictsError) {
    return <p>Error loading data</p>
  }

  const activeConflicts = conflicts
  const inactiveReports = reports.filter(report => report.active === false)

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/dashboard/add-administrator">
          {' '}
          <ButtonAdmin name="Agregar Administrador" backgroundColor="black" />
        </Link>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <h1>{`Te damos la bienvenida ${user?.firstName} ${user?.lastName} a tu portal de Administración`}</h1>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <h4>Aquí podrás encontrar todas las secciones de tu sitio y editar o configurar lo que necesites</h4>
      </div>
      <div className="dashboard-content">
        <div>
          <p>Total de conflictos</p>
          <h3>{activeConflicts.length}</h3>
        </div>
        <div>
          <p>Solicitudes nuevas de reportes de conflictos</p>
          <h3>{inactiveReports.length}</h3>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
