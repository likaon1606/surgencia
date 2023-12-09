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

  static async getAllMembers() {
    try {
      const { data, status } = await api.get('/members/all')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los miembros')
    }
  }

  static async getMemberById(id) {
    try {
      const { data, status } = await api.get(`/members/${id}`)

      if (status === 200) {
        return data
      }
    } catch (error) {
      console.error(error)
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

  static async update(payload, id) {
    try {
      const { data } = await api.put(`/members/${id}`, payload)
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los miembros')
    }
  }
  static async remove(id) {
    const { data } = await api.delete(`/members/${id}`)
    return data
  }
}
