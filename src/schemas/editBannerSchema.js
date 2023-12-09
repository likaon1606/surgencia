import * as yup from 'yup'

export const editBannerSchema = yup
  .object({
    title: yup.string().required("Debes ingresar un titulo"),
    info: yup.string().required("Debes ingresar un subtitulo"),
    active: yup.boolean().required(),
    order: yup.number().required(),
    url: yup.string().optional(),
    file: yup.mixed().nullable(),
  })
  .required()
