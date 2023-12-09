import api from './api.service'

export class ArticleService {
  static async getArticles(page = 1, perPage = 9) {
    try {
      const { data, status } = await api.get('/posts', {
        params: { page, perPage },
      })

      if (status >= 200 && status < 300) {
        return data
      } else {
        throw new Error('Error al obtener los artículos')
      }
    } catch (error) {
      throw new Error('Error de red al obtener los artículos')
    }
  }

  static async getAllArticles() {
    try {
      const { data, status } = await api.get('/posts/all')

      if (status >= 200 && status < 300) {
        return data
      } else {
        throw new Error('Error al obtener los artículos')
      }
    } catch (error) {
      throw new Error('Error de red al obtener los artículos')
    }
  }

  static async getArticleById(id) {
    try {
      const { data, status } = await api.get(`/posts/${id}`)

      if (status === 200) {
        return data
      } else {
        throw new Error('Error al obtener los artículos')
      }
    } catch (error) {
      throw new Error('Error de red al obtener los artículos')
    }
  }

  static async getAllArticleById(id) {
    try {
      const { data, status } = await api.get(`/posts/all/${id}`)

      if (status === 200) {
        return data
      } else {
        throw new Error('Error al obtener los artículos')
      }
    } catch (error) {
      throw new Error('Error de red al obtener los artículos')
    }
  }

  static async create(payload) {
    try {
      const { data } = await api.post('/posts', payload)
      return data
    } catch (error) {
      console.log(error)
      throw new Error('No se pudo crear el artículo')
    }
  }

  static async remove(id) {
    const { data } = await api.delete(`/posts/${id}`)
    return data
  }

  static async editArticle(id, payload) {
    try {
      const { data } = await api.put(`/posts/${id}`, payload)
      return data
    } catch (error) {
      throw new Error(`No se pudo editar el artículo con ID ${id}`)
    }
  }
}
