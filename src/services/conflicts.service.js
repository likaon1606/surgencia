import api from './api.service'

export class  ConflictService {
    static async findConflict() {
      try {
        const { data, status } = await api.get('/conflicts')
        if (status === 200) {
          return data
        }
      } catch (error) {
        throw new Error('No se pudo obtener la informacion de los conflictos')
      }
    }

    static async getConflictById(id) {
      try {
        const { data, status} = await api.get(`/conflicts/${id}`)
        if (status === 200) {
          return data
        }
      } catch (error) {
        throw new Error('No se pudo obtener la informacion de los conflictos')
      }
    }
    
    static async create(conflict) {
      try {
        const { data } = await api.post('/conflicts', conflict)
        return data
      } catch (error) {
        console.log(error)
        throw new Error('No se pudo agregar el conflicto')
      }
    }

    static async update(payload,id) {
      try {
        const { data, status } = await api.put(`/conflicts/${id}`, payload)
        if (status === 200) {
          return data
        }
      } catch (error) {
        throw new Error('No se pudo editar la informacion del conflicto')
      }
    }
  
    static async findAllConflict() {
      try {
        const { data, status } = await api.get('/conflicts/all')
        if (status === 200) {
          return data
        }
      } catch (error) {
        throw new Error('No se pudo obtener la informacion de los conflictos')
      }
    }

    static async remove(id) {
      try {
        const { data, status } = await api.delete(`/conflicts/${id}`)
        if (status === 200) {
          return data
        }
      } catch (error) {
        throw new Error('No se pudo obtener la informacion de los conflictos')
      }
    }
}
  