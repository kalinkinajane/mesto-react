import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});

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
    <div className="App">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm name="profile" title="Редактировать профиль" button="Сохранить" isOpen={isEditProfilePopupOpen ? "popup_open" : ""} onClose={closeAllPopups}>
        <label className="popup__label">
          <input type="text" id="name" name="name" className="popup__input popup__input_type_name" minLength="2"
            maxLength="40" required placeholder="Имя" />
          <span id="name-error" className="popup__error"></span>
        </label>
        <label className="popup__label">
          <input type="text" id="about" name="about" className="popup__input popup__input_type_about" minLength="2"
            maxLength="200" required placeholder="О себе" />
          <span id="about-error" className="popup__error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="add-card" title="Новое место" button="Создать" isOpen={isAddPlacePopupOpen ? "popup_open" : ""} onClose={closeAllPopups}>
        <label className="popup__label">
          <input type="text" id="place-name" name="name" className="popup__input popup__input_type_place-name"
            minLength="1" maxLength="30" required placeholder="Название" />
          <span id="place-name-error" className="popup__error"></span>
        </label>
        <label className="popup__label">
          <input type="url" id="link" name="link" className="popup__input popup__input_type_link" required
            placeholder="Cсылка на картинку" />
          <span id="link-error" className="popup__error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="avatar" title="Обновить аватар" button="Сохранить" isOpen={isEditAvatarPopupOpen ? "popup_open" : ""} onClose={closeAllPopups}>
        <label className="popup__label">
          <input type="url" id="link-avatar" name="avatar" className="popup__input popup__input_type_link-avatar"
            required placeholder="Cсылка на картинку" />
          <span id="link-avatar-error" className="popup__error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?" button="Да"></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
