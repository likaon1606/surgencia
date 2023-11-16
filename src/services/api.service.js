import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const apiService = axios.create({
  baseURL: apiUrl || 'https://c12surgenciaong.onrender.com/api',
  withCredentials: true,
})

export default apiService
