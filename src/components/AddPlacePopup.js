import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
  
    useEffect(() => {
      setName('');
      setLink(``);
    }, [props.isOpen]);
  
    function handleUpdateName(e) {
      setName(e.target.value);
    }
  
    function handleUpdateLink(e) {
      setLink(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      props.onAddPlace({
        name,
        link,
      });
    }
  
    return (
      <PopupWithForm
      name="popup_cards"
      title="Новое место"
      textButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      >
          <input
          className="popup__input popup__input_type_name-card"
          id="inputNameCard"
          type="text"
          placeholder="Название"
          required
          onChange={handleUpdateName}
          value={name || ''}
          />

        <span className="popup__error" id="inputNameCard-error"></span>
          <input
           className="popup__input popup__input_type_url-card"
           id="inputUrlCard"
           type="url"
           placeholder="Ссылка на картинку"
           pattern="https://.*"
           required
           onChange={handleUpdateLink}
           value={link || ''}
          />
        <span className="popup__error" id="inputUrlCard-error"></span>    
        </PopupWithForm>
    );
  }
  
  export default AddPlacePopup;
  

        
       
