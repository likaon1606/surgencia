import api from './api.service'

export class CategoryService {
  static async getCategories() {
    try {
      const { data, status } = await api.get('/category')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de las categorias')
    }
  }
}