import api from './api.service';

export class ResetPassword {
  static async reset({ password, newPassword }) {
    try {
      const { data, status } = await api.put('/users/changepassword', {
        password,
        newPassword,
      })

      if (status === 200) {
        return data
      }
    } catch (error) {
      throw error
    }
  }
}
