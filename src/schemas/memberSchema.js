import * as yup from 'yup'

export const memberSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    info: yup.string().required(),
    active: yup.boolean().required(),
    file: yup
      .mixed()
      .required()
      .test('fileSize', 'El tamaño del archivo es demasiado grande', value => {
        return value.length <= 1024 * 1024 // 1MB
      })
      .test('fileFormat', 'Formato de archivo no compatible', value => {
        return ['image/jpeg', 'image/png'].includes(value?.[0]?.type)
      }),
  })
  .required()
