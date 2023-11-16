import ButtonAdmin from '../../../components/ui/ButtonAdmin'
import { FaFileUpload } from 'react-icons/fa'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ModalMaterial = () => {
  const fileInputRef = useRef(null)

  return (
    <div className="mt-2 p-5">
      <h1>Material Descargable</h1>
      <form>
        <div className="form-group">
          <label>Título:</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group mt-3 mb-5">
          <label>Descripción:</label>
          <input type="text" className="form-control" />
        </div>
        <div
          style={{
            backgroundColor: 'lightgray',
            padding: '15px',
            borderRadius: '10px',
          }}
        >
          <div style={{ backgroundColor: 'white', textAlign: 'center', padding: '100px', borderRadius: '10px' }}>
            <div
              style={{ border: '1px solid black', padding: '6px', borderRadius: '50px', cursor: 'pointer' }}
              onClick={() => fileInputRef.current.click()}
            >
              <FaFileUpload size={20} /> Cargar Archivo
            </div>
            <input type="file" className="d-none" accept="image/*" ref={fileInputRef} />
          </div>

          <div className="d-flex justify-content-end mt-4" style={{ gap: '10px' }}>
            <Link to="/admin/material">
              <ButtonAdmin name="Cancelar" backgroundColor="white" size="6px" width="100px" />
            </Link>
            <ButtonAdmin name="Guardar" backgroundColor="black" size="6px" width="100px" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModalMaterial
