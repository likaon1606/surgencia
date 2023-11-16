import Cards from './components/card/Cards'
import Text from './components/text/Text'
import { Row, Button, Container } from 'react-bootstrap'
import RootLayout from '../../layouts/RootLayout'
import SearchBar from '../../components/ui/SearchBar'
import ButtonBack from '../../components/ui/ButtonBack'
import Breadcrumbs from '@/components/ui/Breadcrums'

const About = () => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Quiénes somos' }]

  return (
    <RootLayout title="Quienes Somos" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <Breadcrumbs breadcrumbs={breadcrumbsData} />
      <Container>
        <Text />
        <Cards />
        <Row className="justify-content-center"></Row>
      </Container>
    </RootLayout>
  )
}

export default About
