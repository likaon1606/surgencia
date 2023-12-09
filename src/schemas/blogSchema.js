import * as yup from 'yup'

export const blogSchema = yup
  .object({
    title: yup.string().required('El titulo es requerido'),
    body: yup.string().required('El contenido es requerido'),
    file: yup
      .mixed()
      .optional()
      .test('fileFormat', 'Formato de archivo no compatible', value => {
        if (!value) return true
        return ['image/jpeg', 'image/png'].includes(value?.[0]?.type)
      })
      .test('fileSize', 'El tamaño del archivo es demasiado grande', value => {
        if (!value) return true
        return value?.length <= 1024 * 1024
      }),
  })
  .required()
