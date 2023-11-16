import RootLayout from '../../layouts/RootLayout'
import HeroBannerSection from './components/hero-banner-section/HeroBannerSection'
import Features from './components/features/Features'
import AplicationFormSection from './components/aplication-form-section/AplicationFormSection'

const Home = () => {
  return (
    <RootLayout>
      <HeroBannerSection />
      <Features />
      <AplicationFormSection />
    </RootLayout>
  )
}

export default Home
