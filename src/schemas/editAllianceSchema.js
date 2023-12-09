import * as yup from 'yup'

export const editAllianceSchema = yup
  .object({
    name: yup.string().required(),
    url: yup.string().optional(),
    active: yup.boolean().required(),
    file: yup.mixed().nullable(),
  })
  .required()
