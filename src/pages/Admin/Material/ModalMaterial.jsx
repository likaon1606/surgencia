import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import useCategories from '@/hooks/useCategories'
import Button from 'react-bootstrap/Button'
import './ModalMaterial.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { addMaterialSchema } from '@/schemas/addMaterialSchema'
import { MaterialService, ImageService } from '../../../services'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { Loader } from '@/components/ui/Loader/Loader'

const ModalMaterial = () => {
  const { id } = useParams()
  const [showInput, setShowInput] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [showCategory, setShowCategory] = useState(true)
  const [material, setMaterial] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { categories } = useCategories()
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      file: null,
      externalUrl: '',
      active: true,
      Category: {},
    },
    resolver: yupResolver(addMaterialSchema),
  })

  const selected = watch('Category.name')

  useEffect(() => {
    try {
      setCategoryId(categories.find(category => category.slug === selected).id)
    } catch (error) {
      setCategoryId('')
    }
  }, [categories, categoryId, selected])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const material = await MaterialService.getMaterialById(id)
          setMaterial(material)
          setImagePreview(material.imagePreview)
          setShowCategory(false)
          setValue('title', material.title)
          setValue('author', material.author)
          setValue('externalUrl', material.externalUrl)
          setValue('description', material.description)
          setValue('active', material.active)
        }
      } catch (error) {
        console.error('Error al obtener datos del artículo', error)
      }
    }
    fetchData()
  }, [id, setValue])

  const handleOnChange = async(e)=>{
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
    if (id) {
      setLoading(true)
      selected === 'Selecciona Categoria'
        ? (payload.categoryId = material.categoryId)
        : (payload.categoryId = categoryId)
      try {
        let imageUrl
        if (file && file[0]) {
          imageUrl = await ImageService.upload(file[0])
        } else { 
          imageUrl = imagePreview
        }
        // Obtiene un nuevo imageUrl si se cambia el archivo
        //const imageUrl = await ImageService.upload(imagePreview[0])
        await MaterialService.updateMaterialById(id, { ...payload, imagePreview: imageUrl })
      } catch (error) {
        // Si no se cambia el archivo, se mantiene el que ya estaba guardado
        const imageUrl = material.imagePreview
        await MaterialService.updateMaterialById(id, { ...payload, imagePreview: imageUrl })
      }
      toast.success('Material Modificado con Exito')
      setTimeout(() => {
        navigate('/admin/material')
      }, 1000)
      setLoading(false)
    } else {
      try {
        setLoading(true)
        const imageUrl = await ImageService.upload(file[0])
        await MaterialService.create({ ...payload, imagePreview: imageUrl, categoryId })
        toast.success('Material Agregado con Exito')
        setTimeout(() => {
          navigate('/admin/material')
        }, 1000)
      } catch (error) {
        console.error({ error })
        setLoading(false)
      }
    }
  })

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className="addMaterial mt-2 bg-secondary bg-opacity-10 rounded-3">
        <div className="mt-3 pt-2">
          <h1>Material Descargable</h1>
        </div>
        <Form className="row mt-4 bg-white rounded-3 p-5" onSubmit={onSubmit}>
          <div className="col-12 col-lg-8">
            <Form.Group className="inputMaterial mb-3">
              <label className="fs-4 mt-4">Título</label>
              <small className="d-block text-danger">{errors?.title?.message}</small>
              <Form.Control
                {...register('title')}
                type="text"
                placeholder="Titulo del material"
                className="ms-2 rounded-pill"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <label className="fs-4 mt-4">Autor</label>
              <small className="d-block text-danger">{errors?.author?.message}</small>
              <Form.Control
                {...register('author')}
                type="text"
                placeholder="Autor del material"
                className="ms-2 mb-3 rounded-pill"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <label className="fs-4 mt-4">Descripción</label>
              <small className="d-block text-danger">{errors?.description?.message}</small>
              <Form.Control
                {...register('description')}
                type="text"
                placeholder="Descripción del material"
                className="ms-2 mb-3 rounded-pill"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <label className="fs-4 mt-4">URL</label>
              <small className="d-block text-danger">{errors?.externalUrl?.message}</small>
              <Form.Control {...register('externalUrl')} type="text" placeholder="URL" className="ms-2 rounded-pill" />
            </Form.Group>
          </div>

          <div className="col-12 col-lg-4 d-flex flex-column">
            <Form.Group className="mb-3">
              <label className="fs-4 mt-4">Imagen</label>
              <small className="d-block text-danger">{errors?.imagePreview?.message}</small>

              <div className="text-center bg-secondary bg-opacity-10 px-2 py-5 rounded">
              <div className="bg-secondary bg-opacity-10 py-2 px-2 rounded text-center">
                {id? <>
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
                )}</>:
                <div><input
                type="file"
                className="form-control"
                accept="image/*" required
                {...register('file')}
              /></div>}
            </div>
              </div>

              <label className="fs-4 mt-4">Categoria</label>
              <small className="d-block text-danger">{errors.Category?.name?.message}</small>
              <div className="text-center bg-secondary bg-opacity-10 px-2 py-5 rounded ">
                {showCategory ? (
                  <Form.Select className="rounded-pill" {...register('Category.name')}>
                    <option value="Selecciona Categoria">Selecciona Categoria</option>
                    {categories &&
                      categories.map(category => (
                        <option key={category.id} value={category.slug}>
                          {category.slug}
                        </option>
                      ))}
                  </Form.Select>
                ) : (
                  <>
                    <p id="showCategory">{material.Category.name || ''}</p>
                    <Button
                      onClick={() => setShowCategory(true)}
                      variant="outline-dark"
                      className="rounded-pill"
                      size="sm"
                    >
                      Cambiar...
                    </Button>
                  </>
                )}
              </div>
              <div className="text-center bg-secondary bg-opacity-10 p-3 rounded my-4 ">
                <div className="form-group d-flex justify-item-center align-items-center">
                  <input type="checkbox" className="form-check-input m-2" {...register('active')} />
                  <label>Activo</label>
                </div>
              </div>
            </Form.Group>
          </div>

          <div className="d-flex flex-wrap justify-content-end mt-4 gap-2">
            <Link to="/admin/material">
              <Button variant="outline-dark" className="rounded-pill" size="lg">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" value="enviar" variant="dark" className="rounded-pill" size="lg">
              Guardar
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ModalMaterial
