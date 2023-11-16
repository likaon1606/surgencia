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
}