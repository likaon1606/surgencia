import api from './api.service'

const formDataHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}
export class ImageService {
  static async upload(file, errorMsg = 'No se pudo guardar la imagen') {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const { data } = await api.post('/images', formData, formDataHeaders)
      return data?.route || data
    } catch (error) {
      console.log(error)
      throw new Error(errorMsg)
    }
  }

  static async uploadMulti(files, errorMsg = 'No se pudo guardar la imagen') {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }
    try {
      const { data } = await api.post('/images/multi', formData, formDataHeaders)
      return data?.route || data
    } catch (error) {
      console.log(error)
      throw new Error(errorMsg)
    }
  }

  static async remove(url) {
    try {
      const { data } = await api.delete(`/images?fileName=${url}`)
      return data
    } catch (error) {
      throw new Error('No se pudo eliminar la imagen')
    }
  }
}
