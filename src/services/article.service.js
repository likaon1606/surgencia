import api from './api.service';

export class ArticleService {
  static async getArticles(page = 1) {
    try {
      const { data, status } = await api.get('/posts', {
        params: { page },
      });

      if (status >= 200 && status < 300) {
        return data;
      } else {
        throw new Error('Error al obtener los artículos');
      }
    } catch (error) {
      throw new Error('Error de red al obtener los artículos');
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/posts', payload);
      return data;
    } catch (error) {
      throw new Error('No se pudo crear el artículo');
    }
  }
}
