import * as yup from 'yup'

export const editMemberSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    info: yup.string().required(),
    active: yup.boolean().required(),
    file: yup.mixed().nullable(),
  })
  .required()
