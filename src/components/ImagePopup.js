import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_opacity ${props.card && 'popup_opened'}`} id="popup_image">
        <div className="popup__image-container">
          <img alt="картинка" src={`${props.card.link}`} className="popup__image" />
          <h2 className="popup__image-title">{props.card.name}</h2>
          <button onClick={props.onClose} className="popup__close-button" id="popup__close-button_image"></button>
        </div>
      </div>
  )
}

export default ImagePopup;