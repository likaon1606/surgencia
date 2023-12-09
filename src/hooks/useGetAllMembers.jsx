import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { MemberService } from '../services/members.service'

const useGetAllMembers = () => {
  return useQuery('members', MemberService.getAllMembers, {
    onError: error => {
      toast.error(error?.message || 'No se pudo obtener la informacion de los miembros')
    },
  })
}

export default useGetAllMembers
