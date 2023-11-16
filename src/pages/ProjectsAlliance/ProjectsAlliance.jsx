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
      <Container>
        <h1 className="ms-5 me-5 mt-5"> Nuestros proyectos </h1>
        <CarouselProjects />
      </Container>
      <Container>
        <h1 className="m-5"> Quienes nos apoyan </h1>
        <CarouselAlliances />
      </Container>
    </RootLayout>
  )
}

export default ProjectsAlliance
