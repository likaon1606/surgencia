import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { editMemberSchema } from '@/schemas/editMemberSchema'
import { MemberService, ImageService } from '../../../services'
import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import { Loader } from '@/components/ui/Loader/Loader'

const EditMember = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [imagePreview, setImagePreview] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [loading, setLoading] = useState(false)

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
    resolver: yupResolver(editMemberSchema),
  })

  useEffect(() => {
    const getMemberData = async () => {
      const memberData = await MemberService.getMemberById(id)

      setValue('firstName', memberData.firstName)
      setValue('lastName', memberData.lastName)
      setValue('info', memberData.info)
      setValue('active', memberData.active)
      setImagePreview(memberData.imageUrl)
    }

    getMemberData()
  }, [])

  const editorContent = watch('info')
  const onEditorStateChange = editorState => {
    setValue('info', editorState)
  }

  const handleOnChange = async e => {
    try {
      const file = e.target.files
      const imageUrl = await ImageService.upload(file[0])
      setImagePreview(imageUrl)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      setLoading(true)
      let imageUrl
      if (file && file[0]) {
        imageUrl = await ImageService.upload(file[0])
      } else {
        imageUrl = imagePreview
      }

      const sanitizedBody = DOMPurify.sanitize(editorContent)
      await MemberService.update(
        {
          ...payload,
          body: sanitizedBody,
          imageUrl,
        },
        id,
      )
      toast.success('Miembro editado con éxito')
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
        <h1>Editar Miembro</h1>
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
            <div className="d-block" style={{ height: '100%' }}>
              <ReactQuill style={{ height: '100%' }} value={editorContent} onChange={onEditorStateChange} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 d-flex flex-wrap flex-column justify-content-between">
          <div className="form-group">
            <label className="fs-4">Imagen de Perfil</label>
            <div className="bg-secondary bg-opacity-10 py-2 px-2 rounded text-center">
              <div className="mx-3">
                <img
                  className="rounded-3"
                  style={{ width: '7em', height: '7em', objectFit: ' cover' }}
                  src={imagePreview}
                />
              </div>
              <Button
                variant="outline-dark"
                className="rounded-pill btn-sm m-3"
                onClick={() => {
                  setShowInput(!showInput)
                }}
              >
                <FaEdit /> Editar Imagen
              </Button>
              {showInput && (
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  {...register('file')}
                  onChange={handleOnChange}
                />
              )}
            </div>

            <small className="d-block text-danger">{errors?.file?.message}</small>
          </div>
          <div className="text-center bg-secondary bg-opacity-10 p-3 rounded my-4 ">
            <div className="form-group d-flex justify-item-center align-items-center">
              <input type="checkbox" className="form-check-input m-2" {...register('active')} />
              <label>Activo</label>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-end mt-4 gap-2">
            <Link to="/admin/about">
              <Button variant="outline-dark" className="rounded-pill" size="lg">
                Volver
              </Button>
            </Link>
            <Button type="submit" value="enviar" variant="dark" className="rounded-pill" size="lg">
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditMember
