import React, { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

 // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

      function handleUpdateName(event) {
        setName(event.target.value);
      }
    
      function handleUpdateDescription(event) {
        setDescription(event.target.value);
      }
    
      function handleSubmit(e) {
       // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

     // Передаём значения управляемых компонентов во внешний обработчик
       props.onUpdateUser({
          name,
          about: description
        });
      }
    
      return (
        <PopupWithForm
        isOpen = {props.isOpen}
        onClose = {props.onClose}
        onSubmit = {handleSubmit}
        name="popup_profile"
        title="Редактировать&nbsp;профиль"
        textButton="Сохранить">

      <input
        className="popup__input popup__input_type_name"
        id="inputName"
        type="text"
        placeholder="Имя"
        value={name || ''} onChange={handleUpdateName}
      />
      <span className="popup__error" id="inputName-error"></span>
      <input
        className="popup__input popup__input_type_about"
        id="inputAbout"
        type="text"
        placeholder="О себе"
        value={description} onChange={handleUpdateDescription}
      />
      <span className="popup__error" id="inputAbout-error"></span>
      </PopupWithForm>
      )}

      export default EditProfilePopup;
