import api from './api.service'

export class ReportConflict {
  static async findAll() {
    const { data } = await api.get('/reports/all')
    return data
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/reports', payload)
      return data
    } catch (error) {
      throw new Error('Ha ocurrido un error, intente nuevamente')
    }
  }

  static async remove(id) {
    try {
      const { data, status } = await api.delete(`/reports/${id}`)
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo eliminar el reporte de conflicto')
    }
  }

  static async approve(id,payload) {
    try {
      const { data } = await api.post(`/reports/accept/${id}`, payload)
      return data
    } catch (error) {
      throw new Error('Ha ocurrido un error, intente nuevamente')
    }
  }

}
