import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ArticleCard.css";

const CardArticle = (props) => {
  const { title, imageUrl, body, createdAt, id } = props.article;
  const dateObject = new Date(createdAt);
  const formattedDate = dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const limitedBody = body.length > 100 ? `${body.slice(0, 100)}...` : body;

  useEffect(() => {
    const handleScrollTop = () => {
      window.scrollTo(0, 0);
    };

    const linkElement = document.getElementById(`read-more-link-${id}`);
    if (linkElement) {
      linkElement.addEventListener("click", handleScrollTop);
    }

    return () => {
      if (linkElement) {
        linkElement.removeEventListener("click", handleScrollTop);
      }
    };
  }, [id]);

  return (
    <div className={`article-card ${props.style}`}>
      <img src={imageUrl} alt="articleCard" />
      <div className="info">
        <h3>{title}</h3>
        <p>{limitedBody}</p>
        <p className="date">Creado {formattedDate}</p>
        <Link to={`/blog/${id}`} id={`read-more-link-${id}`} className="button">
          Leer más {">"}
        </Link>
      </div>
    </div>
  );
};

export default CardArticle;