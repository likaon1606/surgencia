import RootLayout from '../../layouts/RootLayout'
import ButtonBack from '../../components/ui/ButtonBack'
import SearchBar from '../../components/ui/SearchBar'
import Breadcrumbs from '@/components/ui/Breadcrums'
import CarouselProjects from './components/CarouselProjects/CarouselProject'
import CarouselAlliances from './components/CarouselAlliance/CarouselAlliance'
import { Container } from 'react-bootstrap'

const ProjectsAlliance = () => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Proyectos y Alianzas' }]

  return (
    <RootLayout title="Project" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <Breadcrumbs breadcrumbs={breadcrumbsData} />
      <Container className="pb-5">
        <h2 className="text-center mb-5"> Nuestros proyectos </h2>
        <CarouselProjects />
      </Container>
      <Container>
        <h2 className="text-center mb-4"> Quienes nos apoyan </h2>
        <CarouselAlliances />
      </Container>
    </RootLayout>
  )
}

export default ProjectsAlliance
