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

  static async remove(id) {
    try {
      const { data, status } = await api.delete(`/tags/${id}`)
      if (status === 200) {
        return data
      }
    } catch (error) {
      throw new Error('No se pudo eliminar el tag')
    }
  }  


}

