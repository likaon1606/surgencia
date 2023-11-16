import RootLayout from "../../layouts/RootLayout"
import ButtonBack from "../../components/ui/ButtonBack"
import SearchBar from "../../components/ui/SearchBar"
import Breadcrumbs from "../../components/ui/Breadcrums"
import { Container} from 'react-bootstrap'

import CarouselConflicts from './componentsConflictMap/carouselconflicts/CarouselConflicts';
import { InteractiveMap } from "./componentsConflictMap/interactiveMap/InteractiveMap"
import RegisterConflict from "./componentsConflictMap/registerConflict/RegisterConflict"





const ConflictMap = () => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Mapa de conflictos ambientales' }]
  return (
    <RootLayout title="Mapa de conflictos" backButton={<ButtonBack />} searchBar={<SearchBar />}>
    <Breadcrumbs breadcrumbs={breadcrumbsData}/>
    <Container>
        <CarouselConflicts/>
        <InteractiveMap/>
        <RegisterConflict/>
    </Container>
</RootLayout>
  )
}

export default ConflictMap;