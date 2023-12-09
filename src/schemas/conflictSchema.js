import * as yup from 'yup'

export const conflictSchema = yup
  .object({
    title: yup.string().required('Seleccione un titulo'),
    lat: yup.number().required('Indique una latitud'),
    lng: yup.number().required('Indique una longitud'),
    description: yup.string().required('Indique una descripción'),
    active: yup.boolean().required('Active la casilla para aprobar'),
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

export const editConflictSchema = yup
  .object({
    title: yup.string().required('Seleccione un titulo'),
    lat: yup.number().required('Indique una latitud'),
    lng: yup.number().required('Indique una longitud'),
    description: yup.string().required('Indique una descripción'),
    active: yup.boolean().required('Active la casilla para aprobar'),
    file: yup.mixed().nullable(),
  })
  .required()
