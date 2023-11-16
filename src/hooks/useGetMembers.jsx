import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { MemberService } from '../services/members.service'

const useGetMembers = () => {
  return useQuery('members', MemberService.getMembers, {
    onError: error => {
      toast.error(error?.message || 'No se pudo obtener la informacion de los miembros')
    },
  })
}

export default useGetMembers
