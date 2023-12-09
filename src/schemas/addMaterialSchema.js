import * as yup from 'yup'

export const addMaterialSchema = yup
  .object({
    title: yup.string().required('Titulo es un campo requerido'),
    author: yup.string().required('Autor es un campo requerido'),
    description: yup.string().required('Descripción es un campo requerido'),
    externalUrl: yup.string().required('Ingresa una URL'),
    active: yup.boolean().required(),
    Category: yup
      .object()
      .shape({
        name: yup
          .string()
          // Deshabilitar esta línea causa error al editar Material:
          // .notOneOf(['Selecciona Categoria'], 'Selecciona una categoría válida')
          // Es un desplegable, siempre tiene un valor válido de la lista
          .required('Este campo es requerido'),
      })
      .required(),
    file: yup.mixed().nullable()
  })
  .required()
