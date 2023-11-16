import api from './api.service'

export class MemberService {
  static async getMembers() {
    try {
      const { data, status } = await api.get('/members')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los miembros')
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/members', payload)
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los miembros')
    }
  }
}
