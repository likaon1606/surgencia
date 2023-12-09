import { Row, Button, Container, Card } from 'react-bootstrap'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

const CardMember = ({ member }) => {
  const [modalShow, setModalShow] = useState(false)
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="text-center">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img width="35%" className="rounded-1 m-5" src={member.imageUrl} alt="" />
          <h4 className="mb-4">
            {member.firstName} {member.lastName}
          </h4>
          <div className="px-5" dangerouslySetInnerHTML={{ __html: member.info }} />
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <Card className="cardMember m-auto shadow-sm mb-3">
      <Card.Img className="imgCardMember" variant="top" src={member.imageUrl} />
      <Card.Body className="d-flex flex-column ">
        <Card.Title>
          {member.firstName} {member.lastName}
        </Card.Title>
        <Card.Text dangerouslySetInnerHTML={{ __html: member.info.substring(0, 30) }}></Card.Text>
        <Button className="btnMemberCard me-auto mt-auto" variant="dark" onClick={() => setModalShow(true)}>
          Leer más {'>'}
        </Button>
        <MyVerticallyCenteredModal member={member} show={modalShow} onHide={() => setModalShow(false)} />
      </Card.Body>
    </Card>
  )
}
export default CardMember
