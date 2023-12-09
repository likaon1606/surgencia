import * as yup from 'yup'

export const allianceSchema = yup
  .object({
    name: yup.string().required(),
    url: yup.string().optional(),
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
