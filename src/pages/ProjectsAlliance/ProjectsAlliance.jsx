import RootLayout from '../../layouts/RootLayout'
import ButtonBack from '../../components/ui/ButtonBack'
import SearchBar from '../../components/ui/SearchBar'
import Breadcrumbs from '@/components/ui/Breadcrums'
import CarouselProjects from './components/CarouselProjects/CarouselProject'
import CarouselAlliances from './components/CarouselAlliance/CarouselAlliance'
import { Container } from 'react-bootstrap'

const ProjectsAlliance = () => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Proyectos y Colaboraciones' }]

  return (
    <RootLayout title="Project" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <Breadcrumbs breadcrumbs={breadcrumbsData} />

      <Container className="pb-5">
        <h2 className="text-center mb-5"> Nuestros proyectos </h2>
        <div className="m-5 w-75">
          <p>
            Desde el inicio de Surgencia en 2018, hemos desarrollado diversas actividades de educación ambiental como:
            talleres, participación en ferias científicas y charlas enfocadas en la protección y puesta en valor
            socio-ambiental de los ecosistemas playa-duna y humedales costeros. Desde el 2020 hemos aunado esfuerzos con
            diversos actores tanto de la sociedad civil, como de la academia y sector público, para proteger estos
            ecosistemas ante diversas amenazas, generando propuestas de restauración ecológica y de monitoreos
            comunitarios de ecosistemas costeros. <br></br>Las diversas actividades que hemos realizado las puedes
            encontrar en la sección de noticias y a continuación podrás conocer los fondos concursables que nos hemos
            adjudicado.
          </p>
        </div>
        <CarouselProjects />
      </Container>
      <Container>
        <h2 className="text-center mb-4"> Colaboraciones </h2>
        <div className="m-5 w-75">
          Durante nuestra trayectoria hemos formado redes de colaboración entre diversas organizaciones e instituciones
          intersectoriales y multinivel. Te invitamos a conocer algunas de ellas:
        </div>
        <CarouselAlliances />
      </Container>
    </RootLayout>
  )
}

export default ProjectsAlliance
