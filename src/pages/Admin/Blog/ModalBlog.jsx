import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/form/Input'
import { blogSchema } from '@/schemas/blogSchema'
import { ArticleService, ImageService } from '../../../services'
import DOMPurify from 'dompurify'
import useGetTags from '@/hooks/useGetTags'
import Creatable from 'react-select/creatable'
import Quill from 'quill'
import { Loader } from '@/components/ui/Loader/Loader'
import { Button } from 'react-bootstrap'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { ImageInput } from '@/components/form/ImageInput'

const QuillLink = Quill.import('formats/link')

QuillLink.sanitize = function (url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `http://${url}`
  }
  return url
}

const ModalBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)

  const { tags } = useGetTags()

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: '',
      tags: [],
      active: true,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  const editorContent = watch('body')
  const onEditorStateChange = editorState => {
    setValue('body', editorState)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          //const { post } = await ArticleService.getArticleById(id)
          const { post } = await ArticleService.getAllArticleById(id)
          setPost(post)
          reset({
            title: post.title,
            body: post.body,
            active: post.active,
            images: post.PostImages,
          })
          setValue(
            'tags',
            post.Tags?.map(t => ({ value: t.name, label: t.name })),
          )
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, setValue])

  const onSubmit = handleSubmit(async ({ file, images, tags, active, ...payload }) => {
    try {
      setLoading(true)

      const sanitizedBody = DOMPurify.sanitize(editorContent)
      const selectedTags = tags.map(tag => tag.value)

      const articleData = {
        title: payload.title,
        body: sanitizedBody,
        active: !!active,
        tags: selectedTags,
      }

      if (post) articleData.imageUrl = post.imageUrl

      if (file) {
        articleData.imageUrl = await ImageService.upload(file[0])
      }

      if (images?.length > 0) {
        for (let i = 0; i < images.length; i++) {
          if (images[i].file) {
            const imageUrl = await ImageService.upload(images[i].file[0])
            images[i].imageUrl = imageUrl
          }
        }
        articleData.images = images.map(({ file, ...img }) => ({ ...img }))
      }

      if (id) {
        await ArticleService.editArticle(id, articleData)
        toast.success('Artículo editado con éxito')
      } else {
        await ArticleService.create(articleData)
        toast.success('Artículo agregado con éxito')
      }

      navigate('/admin/blog')
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  })

  if (loading) {
    return <Loader />
  }

  return (
    <div className="AgregarMiembros mt-2 p-5">
      <div className="mt-3">
        <h1>{!!post ? 'Editar Articulo' : 'Agregar Articulo'}</h1>
      </div>
      <form className="row mt-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-8 mb-2">
          <Input name="title" label="Titulo:" control={control} />
          <div className="form-group mt-3">
            <label>Contenido:</label>
            <small className="d-block text-danger">{errors?.body?.message}</small>
            <div style={{ height: '280px' }}>
              <ReactQuill style={{ height: '240px' }} value={editorContent} onChange={onEditorStateChange} />
            </div>
          </div>
          <div className="form-group mt-3">
            <label>Tags:</label>
            <Controller
              control={control}
              name="tags"
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Creatable
                    options={tags?.map(t => ({ value: t.name, label: t.name }))}
                    value={value}
                    onChange={onChange}
                    isMulti
                  />
                  <small className="d-block text-danger">{error?.message}</small>
                </>
              )}
            />
          </div>
          <div className="d-flex flex-column align-items-center text-center my-3">
            <h4 className="fs-4">Imagen extras</h4>

            <div className="row w-100 border" style={{ minHeight: 200 }}>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="col-4 d-flex flex-column align-items-center gap-2 border p-3"
                  style={{ gridTemplateColumns: '2' }}
                >
                  <label className="form-label">Descripción</label>
                  <input className="form-control" {...register(`images.${index}.description`)} />
                  <label className="form-label">Imagen</label>
                  <ImageInput imageUrl={field?.imageUrl}>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      {...register(`images.${index}.file`, { setValueAs: files => files })}
                    />
                  </ImageInput>
                  <Button
                    variant="danger"
                    onClick={() => {
                      remove(index)
                    }}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}

              {fields?.length < 3 && (
                <div className="col-4 d-flex align-items-center justify-content-center">
                  <Button
                    className="w-50"
                    disabled={fields?.length >= 3}
                    onClick={() => {
                      append({ description: '' })
                    }}
                  >
                    <FaPlus />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="form-group text-center mb-2">
            <label className="fs-4">Imagen del Articulo</label>
            <ImageInput imageUrl={post?.imageUrl}>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                {...register('file', { setValueAs: files => files[0] })}
              />
              {errors?.file && <small className="d-block text-danger">{errors?.file?.message}</small>}
            </ImageInput>
          </div>

          <div className="form-group mt-3 d-flex justify-item-center align-items-center">
            <label>Estado: </label>
            <input type="checkbox" className="form-check-input m-2" {...register('active')} />
            <label>Activo</label>
          </div>
        </div>
        <div className="w-100 mt-4 d-flex justify-content-center gap-5">
          <button type="submit" className="btn btn-primary" style={{ width: '8em' }}>
            Guardar
          </button>
          <Link to="/admin/blog" className="btn btn-secondary" style={{ width: '8em' }}>
            Volver
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ModalBlog
