import { useState } from 'react'
import SearchBar from '../../../components/ui/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import ButtonBack from '../../../components/ui/ButtonBack'
import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import useAllBanners from '../../../hooks/useAllBanners'
import { BannerService } from '../../../services/banner.service'
import toast from 'react-hot-toast'

const AdminBanners = () => {
  const navigate = useNavigate()

  const { banners, isLoading, isError, refetch } = useAllBanners()
  const [filter, setFilter] = useState('')
  const [visibleBanners, setVisibleBanners] = useState(3)

  const handleEditBanner = id => navigate('edit-banner/' + id)

  const removeBanner = async id => {
    const status = window.confirm(`¿Estás seguro de eliminar el banner?`)
    if (status) {
      await toast.promise(BannerService.remove(id), {
        loading: 'Eliminando...',
        success: <p>banner eliminado con éxito</p>,
        error: err => <b>{err.response?.data?.message || 'Ha ocurrido un error'}</b>,
      })
      refetch()
    }
  }

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (isError) {
    return <p>Error al cargar los datos</p>
  }

  const filteredBanners = banners.filter(banner => banner.title.toLowerCase().includes(filter.toLowerCase()))

  const handleLoadMore = () => {
    setVisibleBanners(prevVisibleBanners => prevVisibleBanners + 3)
  }

  return (
    <div className="mt-2 p-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ width: '1em' }}>
          <ButtonBack />
        </div>
        <Link to="/admin/banners/add-banner">
          {' '}
          <ButtonAdmin name="Agregar Banner" backgroundColor="black" />
        </Link>
      </div>
      <div className="mt-3">
        <h1>Banners</h1>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <SearchBar onChange={e => setFilter(e.target.value)} value={filter} />
      </div>
      <section className="table-wrapper table-responsive mt-5">
        <table className="table table-hover">
          <tbody>
          {filteredBanners.slice(0, visibleBanners).map((banner) => (
          <tr key={banner.id}>
            <td>
              <img
                className="rounded-circle m-auto"
                src={banner.imageUrl}
                alt="banner's Image"
                style={{ width: '7em', height: '7em' }}
              />
            </td>
            <td>
                  <p className="label">Titulo</p>
                  <p className="value">{banner.title}</p>
            </td>
            <td>
                  <p className="label">Descripción</p>
                  <p className="value">{banner.info}</p>
            </td>
            <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <p className="label">URL</p>
                  <p className="value">{banner.url}</p>
            </td>
            <td>
                  <p className="label">Estado</p>
                  <p className="value">{banner.active ? 'Activo' : 'Inactivo'}</p>
            </td>
            <td>
              <div className="d-flex flex-column gap-2">
                  <button className="btn btn-primary" onClick={() => handleEditBanner(banner.id)} style={{ width: '3em' }}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger" onClick={() => removeBanner(banner.id)} style={{ width: '3em' }}>
                    <FaTrash />
                  </button>
              </div>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
      </section>

      {filteredBanners.length > visibleBanners && (
        <div className="mt-3 text-center">
          <button className="btn btn-secondary" onClick={handleLoadMore}>
            Cargar más...
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminBanners
