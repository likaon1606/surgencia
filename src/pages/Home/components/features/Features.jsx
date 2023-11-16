import icon_idea from '../../../../assets/featuresIcons/icon_idea.png'
import icon_tree from '../../../../assets/featuresIcons/icon_tree.png'
import icon_map from '../../../../assets/featuresIcons/icon_map.png'
import Card from 'react-bootstrap/Card'

let infoCards = [
  {
    icon: icon_idea,
    text: 'Lörem ipsum exor nick. Du kan vara drabbad. Däv.',
  },
  {
    icon: icon_tree,
    text: 'Lörem ipsum exor nick. Du kan vara drabbad. Däv.',
  },
  {
    icon: icon_map,
    text: 'Lörem ipsum exor nick. Du kan vara drabbad. Däv.',
  },
]

const Features = () => {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center my-5 text-center fs-5 position-relative">
        {infoCards.map((info, i) => (
          <Card className="position-relative my-4 mx-2 rounded-5 shadow" style={{ width: '16rem' }}>
            <Card.Body>
              <img
                className="position-absolute top-0 start-50 translate-middle rounded-circle border border-3 border-primary bg-white"
                src={info.icon}
                alt=""
              />
              <Card.Text className="my-5 px-3 pb-4">{info.text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}
export default Features
