import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  // Загрузка начальных данных
  React.useEffect(() => {
    api.getAllNeedData().then(([cardData, userData]) => {
      setCurrentUser(userData);
      setCards(cardData)
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  // Добавление новой карточки
  function handleAddPlaceSubmit(data) {
    api.addnewCard(data).then((newCard) => {
      setCards([newCard, ...cards])
    }).catch((err) => console.log(`Ошибка: ${err}`))
    closeAllPopups()
  }
  // Редактирование профиля
  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about }).then((newUserData) => {
      setCurrentUser(newUserData);
    }).catch((err) => console.log(`Ошибка: ${err}`))
    closeAllPopups()
  }
  // Редактирование аватара
  function handleUpdateAvatar({ avatar }) {
    api.editAvatar({ avatar }).then((newAvatar) => {
      setCurrentUser(newAvatar);
    }).catch((err) => console.log(`Ошибка: ${err}`))
    closeAllPopups()
  }
  // Лайк карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLikes(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }
  // Удаление карточки
  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id)
      setCards(newCards)
    }).catch((err) => console.log(`Ошибка: ${err}`))
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name="delete" title="Вы уверены?" button="Да"></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>

  );
}
export default App;
