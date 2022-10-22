import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  React.useEffect(() => {
    api.getInitialData()
      .then((data) => {
        const [userData, cardsData] = data;
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) { // ставит/убирает лайк
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardDelete(card) { //удаляет карточку
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id)); 
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(data) {//редактирует профиль
    api.saveUserChanges(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleUpdateAvatar(data) {//редактирует аватар
    api.changedAvatar(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleAddPlaceSubmit(data) {//редактирует добавляет карточку
    api.postNewCard(data)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  } 

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({}); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleAddPlacePopupOpen}
          onEditAvatar={handleEditAvatarPopupOpen}
          onCardLike={handleCardLike}
          onCardDeleteRequest={handleCardDelete}
          onCardClick={handleCardClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        /> 
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        /> 
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;