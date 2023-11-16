import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <button className="btn-back p-0 m-0 btn btn-outline-light border-0" onClick={() => navigate(-1)}>
      <FaChevronLeft fill="black" />
    </button>
  )
}

export default ButtonBack
