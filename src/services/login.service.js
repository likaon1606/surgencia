import api from './api.service'

export class LoginService {
  static async login({ email, password }) {
    try {
      const { data } = await api.post('/login', { email, password })
      return data
    } catch (error) {
      throw new Error('Email o contraseña incorretos.')
    }
  }
}
