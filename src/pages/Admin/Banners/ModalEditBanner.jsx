import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { editBannerSchema } from '@/schemas/editBannerSchema'
import { BannerService } from '@/services/banner.service'
import { ImageService } from '../../../services'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import { Loader } from '@/components/ui/Loader/Loader'

const EditBanner = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [imagePreview, setImagePreview] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      file: null,
      order: '',
      title: '',
      info: '',
      url: '',
      active: true,
    },
    resolver: yupResolver(editBannerSchema),
  })

  useEffect(() => {
    const getBannerData = async () => {
      const bannerData = await BannerService.getBannerById(id)

      setValue('order', bannerData.order)
      setValue('title', bannerData.title)
      setValue('info', bannerData.info)
      setValue('url', bannerData.url)
      setValue('active', bannerData.active)
      setImagePreview(bannerData.imageUrl)
    }

    getBannerData()
  }, [])

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

      await BannerService.update(id, {
        ...payload,
        imageUrl,
      })
      toast.success('Banner editado con éxito')
      setTimeout(() => {
        navigate('/admin/banners')
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
    <div className="EditarBanner mt-2 p-5">
      <div className="mt-3">
        <h1>Editar Banner</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="title" label="Titulo:" control={control} />
            <Input name="info" label="Información:" control={control} />
            <Input name="url" label="URL:" control={control} />
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
            <Link to="/admin/banners">
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

export default EditBanner
