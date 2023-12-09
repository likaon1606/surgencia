import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { AdministratorService } from '../services/administrator.service'

const useGetUsers = () => {
  const { data, isLoading, isError, refetch } = useQuery('users', AdministratorService.getUsers, {
    onError: error => {
      toast.error(error?.message || 'Error al obtener los usuarios')
    },
  });

  return { data, isLoading, isError, refetch };
}

export default useGetUsers;
