import api from './api.service'

export class ConflictService {
    static async findConflict() {
      const { data } = await api.get('/conflict')
      return data
    }
  }
  