import React, { useState } from 'react';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
// import api from '../utils/api';
import ImagePopup from './ImagePopup';
function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  // const [cards, setCards] = useState([]);
  // const [currentUser, setCurrentUser] = useState({});



  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard();
  }

  // function onCardClick(card) {
  //   setSelectedCard(card)
  // }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}

        // cards={cards}
        // onEditProfile={handleEditProfileClick}
        // onEditAvatar={handleEditAvatarClick}
        // onAddPlace={handleAddPlaceClick}
        // onCardClick={onCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        name="popup_profile"
        title="Редактировать&nbsp;профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        textButton="Сохранить">

        <input
          className="popup__input popup__input_type_name"
          id="inputName"
          type="text"
          placeholder="Имя"
          name="inputName"
        />
        <span className="popup__error" id="inputName-error"></span>
        <input
          className="popup__input popup__input_type_about"
          id="inputAbout"
          type="text"
          placeholder="О себе"
          name="inputAbout"
        />
        <span className="popup__error" id="inputAbout-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="popup_avatar"
        title="Обновить аватар"
        textButton="Сохранить">

        <input
          className="popup__input popup__input_type_avatar"
          id="inputAvatarName"
          type="url"
          name="inputAvatarName"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__error" id="inputAvatarName-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="popup_cards"
        title="Новое место"
        textButton="Создать">

        <input
          className="popup__input popup__input_type_name-card"
          id="inputNameCard"
          type="text"
          placeholder="Название"
          name="inputNameCard"
          required
        />
        <span className="popup__error" id="inputNameCard-error"></span>
        <input
          className="popup__input popup__input_type_url-card"
          id="inputUrlCard"
          type="url"
          placeholder="Ссылка на картинку"
          name="inputUrlCard"
          pattern="https://.*"
          required
        />
        <span className="popup__error" id="inputUrlCard-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div >
  );
}

export default App;
