import RootLayout from '../../layouts/RootLayout'
import SearchBar from '../../components/ui/SearchBar'
import ButtonBack from '../../components/ui/ButtonBack'
import Breadcrumbs from '@/components/ui/Breadcrums'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button,  Card } from 'react-bootstrap'
import './DevTeam.css'
import { FaLinkedin } from 'react-icons/fa'

const DevTeam = () => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Equipo Desarrolladores' }]

const backdevs = [
  {
    name: 'Carlos Palomo',
    image: 'https://avatars.githubusercontent.com/u/68883691?v=4',
    cargo: 'Back End',
    link: 'https://www.linkedin.com/in/cepalomos/',
  },
  {
    name: 'Diego Rojas',
    image: 'https://avatars.githubusercontent.com/u/107219408?v=4',
    cargo: 'Back End',
    link: 'https://www.linkedin.com/in/diegonoelrojasbranez/',
  },
  {
    name: 'Felipe Burboa',
    image: 'https://avatars.githubusercontent.com/u/42621164?v=4',
    cargo: 'Back End',
    link: 'https://www.linkedin.com/in/felipe-burboa/',
  },
  {
    name: 'Leonardo Fernandez',
    image: 'https://avatars.githubusercontent.com/u/73972048?v=4',
    cargo: 'Back End',
    link: 'https://www.linkedin.com/in/lion-fernandez/',
  },
  {
    name: 'Gonzalo Acosta',
    image: 'https://avatars.githubusercontent.com/u/57668973?v=4',
    cargo: 'Back End',
    link: 'https://www.linkedin.com/in/gonzalo-agustin-acosta-developer/',
  },
  {
    name: 'Benjamin Valdes',
    image: 'https://avatars.githubusercontent.com/u/81490092?v=4',
    cargo: 'Back End',
    link: 'https://www.linkedin.com/in/benjamin-valdes91/',
  },
  {
    name: 'René Donaire',
    image:
      'https://media.licdn.com/dms/image/D4E03AQEBTrwEbtoIag/profile-displayphoto-shrink_200_200/0/1702483613915?e=1709769600&v=beta&t=uKbHww1KgjaU8H5JbrU2JMf1kegvlnaR4G92OTX_mr8',
    cargo: 'Back End',
    link: 'https://www.linkedin.com/in/rene-donaire/',
  },
]
const frontdevs = [
  {
    name: 'Javier Figueroa',
    image:
      'https://media.licdn.com/dms/image/D4E03AQFpk5vD5ceVtA/profile-displayphoto-shrink_200_200/0/1672247412918?e=1706745600&v=beta&t=QSWoV7CBmBNN1IykQ2XPp1Tlp5O7HdnY8hRuFcDeuvs',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/javiernfigueroa/',
  },
  {
    name: 'Ariel Fuentes',
    image: 'https://avatars.githubusercontent.com/u/95390615?v=4',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/ariel-f-78604898/',
  },
  {
    name: 'Nicolás Rivas',
    image: 'https://avatars.githubusercontent.com/u/93351367?v=4',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/nicolasrivas-/',
  },
  {
    name: 'Sebastian Diaz',
    image: 'https://avatars.githubusercontent.com/u/87551401?v=4',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/sebasti%C3%A1n-d%C3%ADaz-miranda-82a707168/',
  },
  {
    name: 'Marcelo Bovet',
    image: 'https://avatars.githubusercontent.com/u/112778387?v=4',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/marcelo-bovet-fuentes-b54247119/',
  },
  {
    name: 'Erlis Rivas',
    image: 'https://avatars.githubusercontent.com/u/85533351?v=4',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/erlis-rivas/',
  },
  {
    name: 'Michelle Faure',
    image:
      'https://media.licdn.com/dms/image/D4D03AQG7yyM1dyjXWg/profile-displayphoto-shrink_200_200/0/1689802968935?e=1706745600&v=beta&t=EyWh1qyhCRZYmrswFH3GowYRc5hsjI4DHDFNr4Q-3l0',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/michelle-faure-97676a244/',
  },
  {
    name: 'Yonathan Cordero',
    image:
      'https://media.licdn.com/dms/image/D4E03AQE7nK45ThpJjg/profile-displayphoto-shrink_200_200/0/1689112040772?e=1706745600&v=beta&t=N8WG_8PHU0OEsh2wK6nc1dTouWlrIDwDGXRiLkEaBkE',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/yonathan-cordero-stuardo-a86b5b234/',
  },
  {
    name: 'Marco Camargo',
    image: 'https://avatars.githubusercontent.com/u/104401054?v=4',
    cargo: 'Front-End',
    link: 'https://www.linkedin.com/in/marco-camargo-b10204236/',
  },
  {
    name: 'Daniel Pinto',
    image: 'https://avatars.githubusercontent.com/u/104031313?v=4',
    cargo: 'UX/UI',
    link: 'https://www.linkedin.com/in/dpintok/',
  },
]

const liderdev = [
  {
    name: 'José Campos',
    image:
      'https://media.licdn.com/dms/image/C4D03AQGVorsUcMut2w/profile-displayphoto-shrink_200_200/0/1601262655229?e=1706745600&v=beta&t=qgYeGOO-UqEzw8_jm7IAYT_SI-D2l2heJv_ElNL_-TA',
    cargo: 'Technical Leader',
    link: 'https://www.linkedin.com/in/jose-campos-huiriqueo/',
  },
  {
    name: 'Giancarlo Noseda',
    image:
      'https://media.licdn.com/dms/image/C4E03AQEF7fA3zUMGjg/profile-displayphoto-shrink_200_200/0/1642533525381?e=1706745600&v=beta&t=PkmB3Cu_WZUCOFV5oYaRoqridONoc-xK3T4tKUiXEX4',
    cargo: 'Product Owner',
    link: 'https://www.linkedin.com/in/giancarlonoseda/',
  },

]
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  }
  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 0,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  }

  return (
    <RootLayout title="Quienes Somos" backButton={<ButtonBack />} searchBar={<SearchBar />}>
      <Breadcrumbs breadcrumbs={breadcrumbsData} />
      <div className="contenedorDevMember">
        <h2 className="my-5">Equipo Back-end</h2>
        <Slider {...settings} className="SliderDevMember">
          {backdevs.map(dev => {
            return (
              <Card className="cardDevMember m-auto border-0 text-center">
                <Card.Img className="imgCardDevMember m-auto" variant="top" src={dev.image} />
                <Card.Body className="d-flex flex-column ">
                  <Card.Title>{dev.name}</Card.Title>
                  <Card.Text>{dev.cargo}</Card.Text>
                  <a href={dev.link} target="_blank" className="text-decoration-none">
                    <FaLinkedin className="fs-5" /> Linkedin
                  </a>
                </Card.Body>
              </Card>
            )
          })}
        </Slider>
        <h2 className="my-5">Equipo Front-end</h2>
        <Slider {...settings} className="SliderDevMember">
          {frontdevs.map(dev => {
            return (
              <Card className="cardDevMember m-auto border-0 text-center">
                <Card.Img className="imgCardDevMember m-auto" variant="top" src={dev.image} />
                <Card.Body className="d-flex flex-column ">
                  <Card.Title>{dev.name}</Card.Title>
                  <Card.Text>{dev.cargo}</Card.Text>
                  <a href={dev.link} target="_blank" className="text-decoration-none">
                    <FaLinkedin className="fs-5" /> Linkedin
                  </a>
                </Card.Body>
              </Card>
            )
          })}
        </Slider>
        <h2 className="my-5">Technical Lider / Product Owner</h2>
        <Slider {...settings2} className="SliderDevMember">
          {liderdev.map(dev => {
            return (
              <Card className="cardDevMember m-auto border-0 text-center">
                <Card.Img className="imgCardDevMember m-auto" variant="top" src={dev.image} />
                <Card.Body className="d-flex flex-column ">
                  <Card.Title>{dev.name}</Card.Title>
                  <Card.Text>{dev.cargo}</Card.Text>
                  <a href={dev.link} target="_blank" className="text-decoration-none">
                    <FaLinkedin className="fs-5" /> Linkedin
                  </a>
                </Card.Body>
              </Card>
            )
          })}
        </Slider>
      </div>
    </RootLayout>
  )
}
export default DevTeam
