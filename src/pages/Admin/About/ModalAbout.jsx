import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { memberSchema } from '@/schemas/memberSchema'
import { MemberService, ImageService } from '../../../services'
import DOMPurify from 'dompurify'
import Quill from 'quill'
import { Loader } from '@/components/ui/Loader/Loader'
import { useState } from 'react'

const QuillLink = Quill.import('formats/link')

QuillLink.sanitize = function (url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `http://${url}`
  }
  return url
}

const ModalAbout = () => {
  const [loading, setLoading] = useState(false)
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
      firstName: '',
      lastName: '',
      info: '',
      active: true,
    },
    resolver: yupResolver(memberSchema),
  })

  const editorContent = watch('info')
  const onEditorStateChange = editorState => {
    setValue('info', editorState)
  }

  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      setLoading(true)
      const imageUrl = await ImageService.upload(file[0])
      const sanitizedBody = DOMPurify.sanitize(editorContent)
      await MemberService.create({
        ...payload,
        body: sanitizedBody,
        imageUrl,
      })
      toast.success('Miembro agregado con éxito')
      setTimeout(() => {
        navigate('/admin/about')
      }, 1000)
    } catch (error) {
      console.error({ error })
      setLoading(false)
    }
  })

  if (loading) {
    return <Loader />
  }

  return (
    <div className="AgregarMiembros mt-2 p-5">
      <div className="mt-3">
        <h1>Agregar Miembro</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="firstName" label="Nombre:" control={control} />
            <Input name="lastName" label="Apellido:" control={control} />
          </div>
          <div className="form-group mt-3">
            <label>Descripción:</label>
            <small className="d-block text-danger">{errors?.info?.message}</small>
            <div style={{ height: '240px' }}>
              <ReactQuill style={{ height: '100%' }} value={editorContent} onChange={onEditorStateChange} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 mt-5 d-flex flex-wrap justify-content space-between">
          <div className="form-group">
            <label className="fs-4">Imagen de Perfil</label>
            <p>500x500px</p>
            <input type="file" className="form-control" accept="image/*" {...register('file')} />
            <small className="d-block text-danger">{errors?.file?.message}</small>
          </div>
          <div className="form-group mt-3 d-flex justify-item-center align-items-center">
            <label>Estado: </label>
            <input type="checkbox" className="form-check-input m-2" {...register('active')} />
            <label>Activo</label>
          </div>
          <div className="mt-5 d-flex gap-5">
            <button className="btn btn-primary" style={{ width: '8em', height: '2.5em' }} onClick={''}>
              Guardar
            </button>
            <Link to="/admin/about">
              <button className="btn btn-secondary" style={{ width: '8em' }}>
                Volver
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModalAbout
