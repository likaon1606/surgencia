import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function useArticleData(id) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${id}`)
        const data = await response.json()
        setData(data || [])
      } catch (error) {
        console.error('Error al obtener datos:', error)
        setError('No se pudo obtener la información. Por favor, inténtalo de nuevo más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { data, loading, error }
}

export default useArticleData
