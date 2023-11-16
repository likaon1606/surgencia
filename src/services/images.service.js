import api from './api.service'

export class ImageService {
  static async upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const { data } = await api.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data?.route || data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los miembros')
    }
  }

  static async remove(url) {
    try {
      const { data } = await api.delete(`/images?fileName=${url}`)
      return data
    } catch (error) {
      throw new Error('No se pudo obtener la informacion de los miembros')
    }
  }
}
