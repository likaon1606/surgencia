import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { blogSchema } from '@/schemas/blogSchema'
import { ArticleService, ImageService } from '../../../services'
import useGetTags from '../../../hooks/useGetTags'
import DOMPurify from 'dompurify'

const ModalBlog = () => {
  const { tags } = useGetTags()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      file: null,
      title: '',
      summary: '',
      tags: '',
      body: '',
      active: true,
    },
    resolver: yupResolver(blogSchema),
  })

  const editorContent = watch('body')
  const onEditorStateChange = editorState => {
    setValue('body', editorState)
  }

  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      //puse esto para probar porque si o si necesita una url
      const imageUrl = `http://www.${await ImageService.upload(file[0])}.com`
      const sanitizedBody = DOMPurify.sanitize(editorContent)
      const data = await ArticleService.create({
        ...payload,
        body: sanitizedBody,
        imageUrl,
      })
      toast.success('Articulo Agregado con Exito')
      setTimeout(() => {
        navigate('/admin/Blog')
      }, 1000)
    } catch (error) {
      console.error({ error })
    }
  })

  return (
    <div className="AgregarMiembros mt-2 p-5">
      <div className="mt-3">
        <h1>Agregar Articulo</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="title" label="Titulo" control={control} />
            <Input name="summary" label="Resumen:" control={control} />
          </div>
          <div className="form-group mt-3">
            <label>Contenido:</label>
            <small className="d-block text-danger">{errors?.body?.message}</small>
            <div style={{ height: '240px' }}>
              <ReactQuill style={{ height: '100%' }} value={editorContent} onChange={onEditorStateChange} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 mt-5 d-flex flex-wrap justify-content space-between">
          <div className="form-group">
            <label className="fs-4">Imagen del Articulo</label>
            <p>500x500px</p>
            <input type="file" className="form-control" accept="image/*" {...register('file')} />
            <small className="d-block text-danger">{errors?.file?.message}</small>
          </div>
          <label>
            <h4>Tags:</h4>
          </label>
          <select className="form-control" {...register('tags', { required: 'Este campo es obligatorio' })}>
            <option value="" disabled hidden>
              Seleccionar Tag
            </option>
            {tags &&
              tags.map(tag => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
          </select>
          <small className="d-block text-danger">{errors?.tags?.message}</small>
          <div className="form-group mt-3 d-flex justify-item-center align-items-center">
            <input type="checkbox" className="form-check-input m-2" {...register('active')} />
            <label>Activo</label>
          </div>
          <div className="mt-5 d-flex gap-5">
            <button className="btn btn-primary" style={{ width: '10em', height: '2.5em' }}>
              Guardar
            </button>
            <Link to="/admin/about">
              <button className="btn btn-secondary" style={{ width: '10em' }}>
                Volver
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModalBlog
