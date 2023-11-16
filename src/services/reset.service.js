import api from './api.service'

export class ResetService {
  static async reset({ password, token }) {
    try {
      const { data, status } = await api.put('/users/recoverpassword', {
        password,
        token,
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw error
    }
  }
}
