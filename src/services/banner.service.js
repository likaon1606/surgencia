import api from './api.service'

export class BannerService {
  static async findAll() {
    const { data } = await api.get('/banners')
    return data
  }
}
