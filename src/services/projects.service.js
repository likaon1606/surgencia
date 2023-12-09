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

  static async getProjectById(id) {
    try {
      const { data, status } = await api.get(`/projects/${id}`)

      if (status === 200) {
        return data
      }
    } catch (error) {
      console.error(error)
      throw new Error('No se pudo obtener la informacion del proyecto')
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/projects', payload)
      return data
    } catch (error) {
      throw new Error('No se pudo crear el proyecto')
    }
  }

  static async update(id,payload) {
    try {
      const { data } = await api.put(`/projects/${id}`, payload)
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion del proyecto')
    }
  }

  static async remove(id) {
    try {
      const { data, status } = await api.delete(`/projects/${id}`)
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo eliminar el proyecto')
    }
  }  
}