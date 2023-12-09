import RootLayout from '../../layouts/RootLayout'
import SearchBar from '../../components/ui/SearchBar'
import ButtonBack from '../../components/ui/ButtonBack'
import Breadcrumbs from '@/components/ui/Breadcrums'
import useGetMembers from './../../hooks/useGetMembers'
import CarouselMember from './components/CarouselMember'
import './about.css'
import { Loader } from '@/components/ui/Loader/Loader'

const About = () => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Quiénes somos' }]

  const { data: members, isLoading } = useGetMembers()

  return (
    <RootLayout title="Quienes Somos" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <Breadcrumbs breadcrumbs={breadcrumbsData} />
      <div className="m-5 w-75">
        Un grupo multidisiplinario de voluntari@s unid@s por la conservación y puesta en valor del patrimonio
        costero-marino de la Región de Coquimbo.
      </div>
      <div className="contenedorMembers">
        {isLoading ? <Loader /> : <CarouselMember members={members}></CarouselMember>}
      </div>
    </RootLayout>
  )
}

export default About
