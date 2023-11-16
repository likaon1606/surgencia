import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { ProjectsService } from '../services/projects.service'

const useGetAllProjects = () => {
  return useQuery('projects', ProjectsService.getAllProjects, {
    onError: error => {
      toast.error(error?.message || 'Error al obtener los proyectos')
    },
  })
}

export default useGetAllProjects