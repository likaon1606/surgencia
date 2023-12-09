import api from './api.service'

export class AllianceService {
  static async getAlliance() {
    try {
      const { data, status } = await api.get('/alliance')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de las alianzas')
    }
  }

  static async getAllAlliance() {
    try {
      const { data, status } = await api.get('/alliance/all')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de las alianzas')
    }
  }

  static async getAllianceById(id) {
    try {
      const { data, status } = await api.get(`/alliance/${id}`)

      if (status === 200) {
        return data
      }
    } catch (error) {
      console.error(error)
      throw new Error('No se pudo obtener la informacion de la alianza')
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/alliance', payload)
      return data
    } catch (error) {
      throw new Error('No se pudo crear la alianza')
    }
  }

  static async update(id,payload) {
    try {
      const { data } = await api.put(`/alliance/${id}`, payload)
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de la alianza')
    }
  }

  static async remove(id) {
    try {
      const { data, status } = await api.delete(`/alliance/${id}`)
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo eliminar la alianza')
    }
  }
}