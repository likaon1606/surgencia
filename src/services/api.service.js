import axios, { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

const apiUrl = import.meta.env.VITE_API_URL

const apiService = axios.create({
  baseURL: apiUrl || 'https://c12surgenciaong.onrender.com/api',
  withCredentials: true,
})

apiService.interceptors.response.use(
  response => response,
  function (error) {
    if (isAxiosError(error)) {
      error.message = error.response.data?.message || error.message
      if (error.response.status === 401) {
        window.localStorage.clear()
        window.location.reload()
      }
      toast.error(error.message)
    }
    return Promise.reject(error)
  },
)

export default apiService
