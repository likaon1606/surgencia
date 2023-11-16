import api from './api.service'

export class MaterialService {
  static async getMaterials(page = 1) {
    try {
      const { data, status } = await api.get('/materials', {
        params: { page },
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los materiales')
    }
  }

  static async getMaterialsFiltered(page = 1, id) {
    try {
      const { data, status } = await api.get(`/materials/category/${id}`, {
        params: { page },
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los materiales')
    }
  }

  static async getMaterialsByCategorySlug(slug, page = 1) {
    try {
      const { data } = await api.get(`/materials/category/slug/${slug}`, {
        params: { page },
      })
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los materiales')
    }
  }
}
