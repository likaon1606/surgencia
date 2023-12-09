import { useState } from 'react'
import { FaTrash, FaEdit, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import { useGetAllArticles } from '../../../hooks/useGetAllArticles'
import { ArticleService } from '../../../services/article.service'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'

const AdminBlog = () => {
  const { data: articles, isLoading, isError, refetch } = useGetAllArticles()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('')
  const [visibleArticles, setVisibleArticles] = useState(3)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const articlesFiltered = articles.filter(article =>
    article.title.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleLoadMore = () => {
    setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 3)
  }

  const confirmDelete = async (id, title) => {
    const status = window.confirm(`¿Estás seguro de eliminar la noticia "${title}"?`)
    if (status) {
      await toast.promise(ArticleService.remove(id), {
        loading: 'Eliminando...',
        success: (
          <p>
            Noticia <b>{title}</b> eliminada con éxito
          </p>
        ),
        error: err => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
      })
      refetch()
    }
  }

  return (
    <div className="mt-2 p-2 p-md-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/Blog/add-article">
          <ButtonAdmin name="Agregar Articulo" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Articulos de Blog</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>

      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
            {articlesFiltered.slice(0, visibleArticles).map(article => (
              <tr key={article.id}>
                <td>
                  <img
                    className="rounded-circle"
                    src={article.imageUrl}
                    alt="Article's Image"
                    style={{ width: '7em', height: '7em' }}
                  />
                </td>
                <td>
                  <p className="label">Titulo</p>
                  <p className="value">{article.title}</p>
                </td>
                <td>
                  <p className="label">Fecha</p>
                  <p className="value">
                    {new Date(article.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </td>
                <td>
                  <p className="label">Autor</p>
                  <p className="value">
                    {article.User.firstName} {article.User.lastName}
                  </p>
                </td>
                <td>
                  <p className="label">Estado</p>
                  <p className="value">{article.active ? 'Activo' : 'Inactivo'}</p>
                </td>
                <td>
                  <div className="d-flex flex-column gap-2 align-items-end">
                    <Link
                      className="btn btn-success"
                      to={`/blog/${article.id}`}
                      target="_blank"
                      style={{ width: '3em' }}
                    >
                      <FaArrowRight />
                    </Link>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/admin/blog/edit-article/${article.id}`)}
                      style={{ width: '3em' }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => confirmDelete(article.id, article.title)}
                      style={{ width: '3em' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {articlesFiltered.length > visibleArticles && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminBlog
