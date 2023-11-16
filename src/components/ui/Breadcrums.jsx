import React from 'react'
import { Link } from 'react-router-dom'
import { TiChevronRight } from 'react-icons/ti'

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav
      className="breadcrumb d-flex align-items-center gap-2 my-5"
      style={{
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'black',
      }}
    >
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <TiChevronRight />}
          {crumb.url ? (
            <Link to={crumb.url} className="breadcrumb-item" style={{ color: 'black', textDecoration: 'none' }}>
              {crumb.name}
            </Link>
          ) : (
            <span className="breadcrumb-item active" style={{ color: 'black', textDecoration: 'none' }}>
              {crumb.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs
