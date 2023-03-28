import React, { useState, useEffect } from 'react';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import  api  from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup ';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(null)


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, items]) => {
            setCurrentUser(data);
            setCards(items);
        })
        .catch((err) => {
            console.log(err)
        })
}, [])

function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Отправляем запрос в API и получаем обновлённые данные карточки
  if (!isLiked) {
    api.addLike(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch((err) => {
      console.error(err);
    });
  } else {
    api.deleteLike(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch((err) => {
      console.error(err);
    });
  }
}

function handleCardDelete(card) {
  api.deleteCard(card._id).then(() => {
    setCards((state) => state.filter((c) => c._id !== card._id && c));
  }).catch((err) => {
    console.error(err);
  });
}

function handleUpdateUser(items) {
  api
    .changeUserInfo(items)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}

function handleUpdateAvatar(items) {
  api.changeUserAvatar(items).then((data) => {
    setCurrentUser(data);
    closeAllPopups();
  }).catch((err) => {
    console.error(err);
  })
}
function handleAddPlaceSubmit(items) {
  api
    .addCard(items)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}

// const isOpen=
// isEditAvatarPopupOpen ||
// isEditProfilePopupOpen ||
// isAddPlacePopupOpen ||
// selectedCard;

// //Закрываем попапы по кнопке Escape 
// useEffect(() => {
//   function onCloseEsc(evt) {
//     if (evt.key ==='Escape') {
//       closeAllPopups();
//     }
//   }
// if (isOpen) {
//       document.addEventListener('keydown', onCloseEsc);
//     } else {
//       document.removeEventListener('keydown', onCloseEsc);
//     };
//   }, [isOpen])

//   // Закрываем попапы по  клику на Overlay   
//   useEffect(() => {
//     function onCloseOverlay(evt) {
//       if (evt.target.classList.contains('popup_opened')) {
//        closeAllPopups();
//      }
//    }
//   if (isOpen) {
//         document.addEventListener('mousedown', onCloseOverlay);
//       } else {
//         document.removeEventListener('mousedown', onCloseOverlay);
//       };
//     }, [isOpen])
    

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(null);

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* <div className="App"> */}
      <div className="page">
        <Header />
        <Main
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
          onCardLike = {handleCardLike}
          onConfirmCardDelete = {(card) => setIsConfirmationPopupOpen(card)}
          cards={cards}
        />
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
       />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}>
      </EditAvatarPopup>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        >
     </AddPlacePopup>
     <ConfirmationPopup
        card  = {isConfirmationPopupOpen}
        name="popup_card-delete"
        title="Вы уверены?"
        textButton="Да"
        onClose={closeAllPopups}
        onCardDelete = {handleCardDelete}
       >
      </ConfirmationPopup>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      {/* </div> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
