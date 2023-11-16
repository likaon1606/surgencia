import api from './api.service'

export class RecoverService {
  static async recover({ email }) {
    try {
      const { data, status } = await api.get(`/users/recoverpassword/${email}`, {
        email: email,
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('Error en el servidor ')
    }
  }
}
