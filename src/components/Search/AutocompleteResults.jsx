import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import { MdSearchOff, MdDownload } from 'react-icons/md'
import PropTypes from 'prop-types'

const MaterialItem = ({ id, title }) => {
  return (
    <ListGroup.Item className="d-flex align-items-center justify-content-between gap-3">
      <h4 className="fs-6 fw-semibold mb-0">{title}</h4>
      <MdDownload size={24} />
    </ListGroup.Item>
  )
}

const PostItem = ({ id, title, imageUrl }) => {
  return (
    <ListGroup.Item>
      <Link to={`/article/${id}`} className="text-decoration-none d-flex align-items-center gap-3">
        {imageUrl && <img src={imageUrl} alt={title} width={20} height={20} />}
        <div>
          <h4 className="fs-6 fw-semibold mb-0">{title}</h4>
        </div>
      </Link>
    </ListGroup.Item>
  )
}

export default function AutocompleteResults({ autocomplete, autocompleteState, panelRef }) {
  return (
    <div
      className="position-absolute w-100 mt-5 top-0 end-0 overflow-hidden z-1 rounded"
      ref={panelRef}
      {...autocomplete.getPanelProps()}
      style={{ minWidth: '360px' }}
    >
      {autocompleteState.collections.map((collection, index) => {
        const { items } = collection
        return (
          <section key={`section-${index}`}>
            {items.length > 0 && (
              <ListGroup {...autocomplete.getListProps()}>
                {items.map(item => {
                  return [
                    item.posts?.length > 0 && <ListGroup.Item variant="info">Blog</ListGroup.Item>,
                    ...item.posts?.map(post => <PostItem key={item.id} {...post} />),
                    item.materials?.length > 0 && <ListGroup.Item variant="info">Material</ListGroup.Item>,
                    ...item.materials?.map(material => <MaterialItem key={item.id} {...material} />),
                    item.posts?.length === 0 && item.materials?.length === 0 && (
                      <article className="d-flex flex-column align-items-center text-center gap-2 p-3 bg-white border rounded">
                        <MdSearchOff size={40} />
                        <p>No hemos encontrado nada que coincida con tu búsqueda.</p>
                        <small>Inténtalo de nuevo con un término diferente</small>
                      </article>
                    ),
                  ]
                })}
              </ListGroup>
            )}
          </section>
        )
      })}
    </div>
  )
}

AutocompleteResults.propTypes = {
  autocomplete: PropTypes.object,
  autocompleteState: PropTypes.object,
  panelRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
}
