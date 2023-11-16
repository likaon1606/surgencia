import api from './api.service';

export class TagService {
  static async getTags() {
    try {
      const { data } = await api.get('/tags');
      return data;
    } catch (error) {
      throw new Error('Error al obtener los tags');
    }
  }
}
