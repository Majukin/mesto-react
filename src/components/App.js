import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <div className="page">
      <Header />
      <Main 
      onEditProfile={handleEditProfilePopupOpen}
      onAddPlace={handleAddPlacePopupOpen}
      onEditAvatar={handleEditAvatarPopupOpen}
      onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input name="name" id="name" type="text" className="popup__input popup__input_type_name" size="358" required
            minLength="2" maxLength="40" />
          <span name="errorName" id="name-error" className="popup__span"></span>
        </div>
        <div className="popup__input-container">
          <input name="about" id="job" type="text" className="popup__input popup__input_type_job" size="358" required
            minLength="2" maxLength="200" />
          <span id="job-error" className="popup__span"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        name="add"
        title="Новое место"
        buttonText="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input id="place" type="text" className="popup__input popup__input_type_place" size="358" name="name"
            placeholder="Название" required minLength="2" maxLength="30" />
          <span id="place-error" className="popup__span"></span>
        </div>
        <div className="popup__input-container">
          <input id="link" type="url" className="popup__input popup__input_type_link" size="358" name="link"
            placeholder="Ссылка на картинку" required />
          <span id="link-error" className="popup__span"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input id="avatar" type="url" className="popup__input popup__input_type_avatar" size="358" name="link" placeholder="Ссылка на изображение" required />
          <span id="avatar-error" className="popup__span"></span>
        </div>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;