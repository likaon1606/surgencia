import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FaEdit } from 'react-icons/fa'

export const ImageInput = ({ imageUrl, children }) => {
  const [showInput, setShowInput] = useState(!imageUrl)
  return (
    <div className="d-flex flex-column align-items-center gap-3 bg-secondary bg-opacity-10 p-3 rounded text-center">
      {imageUrl && (
        <>
          <img className="img-fluid rounded-3" style={{ width: '9em', objectFit: 'cover' }} src={imageUrl} />
          <Button
            variant="outline-dark"
            className="rounded-pill btn-sm"
            onClick={() => {
              setShowInput(!showInput)
            }}
          >
            <FaEdit /> Editar Imagen
          </Button>
        </>
      )}
      {showInput && children}
    </div>
  )
}

ImageInput.propTypes = {
  imageUrl: PropTypes.string,
  initialState: PropTypes.bool,
}
