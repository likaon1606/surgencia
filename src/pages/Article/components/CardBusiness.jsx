import React from 'react';

const CardBusiness = ({ name, lastName, description, image }) => {
  return (
    <div>
      <div className="card-body d-flex align-items-center">
        <img src={image} className="rounded-circle mx-1" style={{ width: '7em', height: '7em' }} alt="foto" />
        <div className="mx-4">
          <h3 className="card-title">
            {name} {lastName}
          </h3>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardBusiness;