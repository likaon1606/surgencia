import logo from '@/assets/logo.png'
import './Loader.css'

export const Loader = ({ fullHeight = false, showLogo = true }) => {
  return (
    <main className={`d-flex flex-column justify-content-center align-items-center py-5 ${fullHeight && 'vh-100'}`}>
      {showLogo && <img src={logo} alt="logo" width={64} />}
      <span className="loader ms-2"></span>
    </main>
  )
}
