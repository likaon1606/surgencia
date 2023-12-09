import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Input } from '@/components/form/Input'
import { bannersSchema } from '@/schemas/bannersSchema'
import { ImageService } from '@/services'
import { BannerService } from '@/services/banner.service'
import './ModalCreateBanners.css'
import { Button, Modal } from 'react-bootstrap'
import { Loader } from '@/components/ui/Loader/Loader'

const ModalCreateBanner = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [preImg, setPreImg] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      file: null,
      title: '',
      order: 0,
      info: '',
      active: true,
    },
    resolver: yupResolver(bannersSchema),
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onSubmit = handleSubmit(async ({ file, ...payload }) => {
    try {
      setLoading(true)
      const imageUrl = await ImageService.upload(file[0])
      await BannerService.create({
        ...payload,
        imageUrl,
      })

      toast.success('Banner creado con éxito')
      setTimeout(() => {
        navigate('/admin/banners')
      }, 1000)
    } catch (error) {
      console.error(error.toString())
      setLoading(false)
    }
  })

  const handleChange = e => {
    setPreImg(URL.createObjectURL(e.target.files[0]))
  }

  const bannerTitle = watch('title', '')
  const bannerInfo = watch('info', '')

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container mt-2 p-5">
      <div className="mt-3">
        <h1>Agregar Banner</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8">
          <div className="form-group">
            <Input name="title" label="Titulo:" control={control} />
            <Input name="info" label="Información:" control={control} />
            <Input name="url" label="URL (Campo opcional):" control={control} />
            <input type="checkbox" className="form-check-input m-2" {...register('active')} />
            <label>Activo</label>
          </div>
        </div>
        <hr className=" my-4 col-12 col-lg-8"></hr>
        <div className="">
          <div className="form-group col-12 col-lg-8">
            <label htmlFor="images" className="drop-container">
              <span className="drop-title">Arrastra una imagen acá o</span>
              <input
                type="file"
                className="imagesInput"
                accept="image/*"
                required
                {...register('file')}
                onChange={handleChange}
              />
            </label>
            <small className="d-block text-danger">{errors?.file?.message}</small>
          </div>

          <div className="mt-5 d-flex gap-5 align-items-center">
            <button className="btn btn-dark" style={{ width: '12em', height: '3em' }}>
              Guardar
            </button>
            <Link to="/admin/banners" className="p-0">
              <button type="button" className="btn btn-outline-dark p-0" style={{ width: '12em', height: '3em' }}>
                Volver
              </button>
            </Link>
          </div>
        </div>
      </form>
      <button className="btn btn-success mt-2" style={{ width: '12em', height: '3em' }} onClick={handleShow}>
        Vista previa
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-1 modal-body">
          <div className="d-flex justify-content-center align-items-cente my-0">
            <img src={preImg} alt="" style={{ width: '30em', height: '20em' }} />
          </div>
          <div className=" d-grid text-modal text-white position-absolute bottom-0 start-50 translate-middle-x">
            <h1 className="col">{bannerTitle}</h1>
            <h5 className="col m-auto pb-3">{bannerInfo}</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalCreateBanner
