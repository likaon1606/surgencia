import api from './api.service'

export class MaterialService {
  static async getMaterials(page = 1, perPage = 9) {
    try {
      const { data, status } = await api.get('/materials', {
        params: { page, perPage },
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los materiales')
    }
  }

  static async getAllMaterials() {
    try {
      const { data, status } = await api.get('/materials/all')
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de las alianzas')
    }
  }

  static async getMaterialsFiltered(page = 1, perPage = 9, id) {
    try {
      const { data, status } = await api.get(`/materials/category/${id}`, {
        params: { page, perPage },
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los materiales')
    }
  }

  static async getMaterialsByCategorySlug(slug, page = 1, perPage = 9) {
    try {
      const { data } = await api.get(`/materials/category/slug/${slug}`, {
        params: { page, perPage },
      })
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los materiales')
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/materials', payload)
      return data
    } catch (error) {
      throw new Error('No se pudo crear material')
    }
  }

  static async getMaterialById(id) {
    try {
      const { data } = await api.get(`/materials/${id}`)
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion del material')
    }
  }

  static async updateMaterialById(id, payload) {
    try {
      const { data } = await api.put(`/materials/${id}`, payload)
      return data
    } catch (error) {
      throw new Error('No se pudo actualizar la informacion del material')
    }
  }

  static async deleteMaterialById(id) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await api.delete(`/materials/${id}`)
    } catch (error) {
      throw new Error('No se pudo eliminar el material')
    }
  }
}
