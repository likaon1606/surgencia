import { useState } from 'react'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { MaterialService } from '../services/material.service'

export const useDeleteMaterial = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [materialToDelete, setMaterialToDelete] = useState(null)
  const queryClient = useQueryClient()

  const removeMaterial = material => {
    setMaterialToDelete(material)
    setShowConfirmModal(true)
  }

  const handleClose = () => setShowConfirmModal(false)

  const confirmDelete = async () => {
    setMaterialToDelete(null)
    setShowConfirmModal(false)
    await toast.promise(MaterialService.deleteMaterialById(materialToDelete.id), {
      loading: 'Eliminando...',
      success: <b>Material {materialToDelete.title} eliminado con éxito</b>,
      error: err => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
    })
    // refetch();
    queryClient.invalidateQueries('materials')
  }
  return { showConfirmModal, removeMaterial, handleClose, confirmDelete }
}
