import logo from '@/assets/logo.png'
import './Loader.css'

export const Loader = () => {
  return (
    <main className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <img src={logo} alt="logo" width={64} />
      <span class="loader ms-2"></span>
    </main>
  )
}
