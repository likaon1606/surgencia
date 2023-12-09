import * as yup from 'yup'

export const bannersSchema = yup
  .object({
    title: yup.string().required("Debes ingresar un titulo"),
    info: yup.string().required("Debes ingresar un subtitulo"),
    active: yup.boolean().required(),
    order: yup.number().required(),
    url: yup.string().optional(),
    file: yup
      .mixed()
      .required()
      .test('fileSize', 'El tamaño del archivo es demasiado grande', (value) => {
        return value.length <= 10000 * 10000;
      })
      .test('fileFormat', 'Formato de archivo no compatible', (value) => {
        return ['image/jpeg', 'image/png'].includes(value?.[0]?.type);
      }),
  })
  .required();