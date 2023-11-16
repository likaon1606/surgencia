import React, { useState } from 'react'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { ResetPassword } from '@/services/change-password.service'

const useChangePassword = () => {
  return useMutation(({ password, newPassword }) => ResetPassword.reset({ password, newPassword }), {
    onSuccess: () => {
      toast.success('Se actualizó tu contraseña correctamente')
    },
    onError: error => {
      const errorMessage = error?.response?.data?.message || error?.message
      toast.error(errorMessage || 'Algo salió mal, vuelve a intentarlo')
    },
  })
}

const ChangePassword = () => {
  const changePasswordMutation = useChangePassword()

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    // if (password !== newPassword) {
    //   console.error('Las contraseñas no coinciden')
    //   return
    // }

    changePasswordMutation.mutate({ password, newPassword: newPassword })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Contraseña Actual:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label>
        Nueva Contraseña:
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
      </label>
      <br />
      <button type="submit">Cambiar Contraseña</button>
    </form>
  )
}

export default ChangePassword
