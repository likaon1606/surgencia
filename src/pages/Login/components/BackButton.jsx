import { useNavigate } from 'react-router-dom'
import backArrow from '../../../assets/featuresIcons/back_arrow.png'

const BackButton = () => {
  const imgStyle = {
    height: '30px',
  }
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/')
  }
  return (
    <div>
      <button onClick={handleBack} className="bg-white border-0 d-flex pt-4">
        <img src={backArrow} style={imgStyle} />
      </button>
    </div>
  )
}

export default BackButton
