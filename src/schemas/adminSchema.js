import * as yup from 'yup'

export const adminSchema = yup
  .object({
    firstName: yup.string().required("Indique un nombre"),
    lastName: yup.string().required("Indique un apellido"),
    email: yup.string().required("Indique un e-mail"),
  })
  .required()