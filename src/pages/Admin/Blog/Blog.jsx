import { useState } from 'react'
import SearchBar from '../../../components/ui/SearchBar'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import { useArticles } from '../../../hooks/useArticles'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminBlog = () => {
  const { data: articles, isLoading, isError } = useArticles()

  const [filter, setFilter] = useState('')
  const [visibleArticles, setVisibleArticles] = useState(3)

  // interface PostAttributes {
  //   id: string;
  //   title: string;
  //   imageUrl: string;
  //   summary: string;
  //   body: string;
  //   userId: string;
  //   active: boolean;
  // }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading data</p>
  }

  const articlesFiltered = articles.paginatedResults.filter(article =>
    article.title.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleLoadMore = () => {
    setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 3)
  }

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/Blog/add-article">
          {' '}
          <ButtonAdmin name="Agregar Articulo" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Articulos de Blog</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <div className="mt-5">
        {articlesFiltered.slice(0, visibleArticles).map((article, id) => (
          <div key={id} className="p-2">
            <div className="">
              <p className="">
                {article.User.firstName} {article.User.lastName}
              </p>
            </div>
            <div className="d-flex mt-3">
              <img
                className="rounded-circle"
                src={article.imageUrl}
                alt="Article's Image"
                style={{ width: '10em', height: '10em' }}
              />
              <div className="ml-5 p-3 d-flex justify-content-between align-items-start" style={{ width: '100%' }}>
                <div>
                  <p>{article.title}</p>
                  <p>{article.summary}</p>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <button className="btn" style={{ width: '1em' }}>
                    <FaTrash />
                  </button>
                  <button className="btn" style={{ width: '1em' }}>
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
