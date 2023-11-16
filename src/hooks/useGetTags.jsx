import { useEffect, useState } from 'react'
import { TagService } from '../services'

const useGetTags = () => {
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await TagService.getTags()
        setTags(tagsData)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTags()
  }, [])

  return { tags, isLoading, error }
}

export default useGetTags
