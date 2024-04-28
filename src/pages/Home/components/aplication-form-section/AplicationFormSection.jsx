import './aplicationFormSection.css'
import imgSurgencia from '../../../../assets/imgSurgencia.png'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const AplicationFormSection = () => {
  return (
    <div>
      <Card className="card-aplication-form shadow border-0">
        <Card.Body className="text-center mx-auto my-4">
          <Card.Text>
            ¡Contáctanos!<br></br> Si tienes alguna duda, sugerencia o comentario, escríbenos y nos pondremos en contacto
            contigo.
          </Card.Text>
          <a href="mailto:surgenciaong@gmail.com?subject=Mensaje desde pagina web">
            <Button variant="dark" className="btn-aplication-form rounded-pill">
              Enviar
            </Button>
          </a>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AplicationFormSection
