import * as yup from 'yup'

export const blogSchema = yup
  .object({
    title: yup.string().required(),
    summary: yup.string().required(),
    body: yup.string().required(),
    active: yup.boolean().required(),
    tags: yup.string().required(),
    file: yup
      .mixed()
      .required()
      .test('fileSize', 'El tamaño del archivo es demasiado grande', (value) => {
        return value.length <= 1024 * 1024; // 1MB
      })
      .test('fileFormat', 'Formato de archivo no compatible', (value) => {
        return ['image/jpeg', 'image/png'].includes(value?.[0]?.type);
      }),
  })
  .required();
