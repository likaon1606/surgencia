import api from './api.service'

export class ProjectsService {
  static async getProjects() {
    try {
      const { data, status } = await api.get('/projects')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los proyectos')
    }
  }

  static async getAllProjects() {
    try {
      const { data, status } = await api.get('/projects/all')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los proyectos')
    }
  }
}