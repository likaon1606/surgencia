import * as yup from 'yup'

export const editProjectSchema = yup
  .object({
    name: yup.string().required(),
    activityTitle: yup.string().required(),
    activityDescription: yup.string().required(),
    url: yup.string().optional(),
    active: yup.boolean().required(),
    file: yup.mixed().nullable(),
  })
  .required()
