import { Link } from "react-router-dom";
import "./ArticleCard.css";

const ArticleCard = (props) => {
  const { title, imageUrl, body, createdAt, id } = props.article;
  const dateObject = new Date(createdAt);
  const formattedDate = dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const limitedBody = body.length > 150 ? `${body.slice(0, 150)}...` : body;

  return (
    <div className={`article-card col-4 ${props.style}`}>
      <img src={imageUrl} alt="articleCard" className="img-fluid" />
      <div className="info">
        <h3>{title}</h3>
        <p>{limitedBody}</p>
        <p className="date">Creado {formattedDate}</p>
        <Link to={`/blog/${id}`} className="button">
          Leer más {">"}
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
