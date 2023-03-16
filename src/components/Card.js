import React from 'react';
import ImagePopup from './ImagePopup';

function Card({ card, name, link, likes, onCardClick }) {

    function handleCardClick() {
        onCardClick(card);
    }


    return (
        <article className="element">
            <img onClick={handleCardClick} className="element__image" alt={name} src={link} />
            <button
                className="element__delete"
                type="button"
            ></button>
            <div className="element__title-button">
                <h2 className="element__title">{name}</h2>
                <div className="element__container-like">
                    <button className="element__like" type="button"></button>
                    <span className="element__like-counter">{likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;
