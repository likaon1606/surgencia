import api from './api.service'

export class AdministratorService {

  static async getUsers() {
    try {
      const { data, status } = await api.get('/users')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los usuarios')
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/users', payload)
      return data
    } catch (error) {
      throw new Error('No se pudo crear el administrador')
    }
  }

  static async generate ({ password, token, id_user }) {
    try {
      const { data, status } = await api.put(`/users/generatepass/${id_user}/${token}`, {
        password,
        token,
        id_user,
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw error
    }
  }

  static async remove(id) {
    try {
      const { data, status } = await api.delete(`/users/${id}`)
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo eliminar el usuario')
    }
  }
}
