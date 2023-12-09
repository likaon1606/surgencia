import api from './api.service'

export class BannerService {

  static async findAll() {
    const { data } = await api.get('/banners')
    return data
  }

  static async getAllBanners() {
    const { data } = await api.get('/banners/all')
    return data
  }

  static async getBannerById(id) {
    try {
      const { data, status } = await api.get(`/banners/${id}`)
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo obtener el banner')
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/banners', payload)
      return data
    } catch (error) {
      throw new Error('error')
    }
  }

  static async update(id,payload) {
    try {
      const { data } = await api.put(`/banners/${id}`, payload)
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion deL banner')
    }
  }

  static async remove(id) {
    try {
      const { data, status } = await api.delete(`/banners/${id}`)
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('error al eliminar el banner')
    }
  }
}
