import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={props.onClose}  className="popup__close-button" type="reset" id="popup__close-button_edit"></button>
        <form noValidate name={props.name} className="popup__form" id="popup__form_edit">
        <h2 className="popup__title">{props.title}</h2>
          {props.children}
        <button className="popup__form-button" id="popup__form-button_edit" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm; 