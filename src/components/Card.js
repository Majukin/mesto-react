import React from 'react';

function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  return (
        <div className="element">
      <img onClick={handleCardClick} src={props.card.link} alt={props.card.name} className="element__image"/> 
          <button className="element__delete-button" type="button"></button>
          <div className="element__info">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like-container">
              <button className="element__like-button" type="button"></button>
              <p className="element__like-counter">{props.card.likes.length}</p>
            </div>
          </div>
        </div>
  )
}

export default Card;