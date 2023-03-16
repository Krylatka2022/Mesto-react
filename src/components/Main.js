import React, { useState, useEffect } from 'react';
import Card from './Card';
import api from '../utils/api';


function Main({ onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick
}) {

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

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

    return (
        <main>
            <section className="profile">
                <div className="profile__contain">
                    <button className="profile__avatar-button" onClick={onEditAvatar}>
                        <img
                            src={currentUser.avatar}
                            alt="Жак-Ив-Кусто"
                            className="profile__avatar"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__title-button">
                            <h1 className="profile__title" name="profileTitle">{currentUser.name}</h1>
                            <button
                                className="profile__edit-button"
                                type="button"
                                name="profileButton"
                                onClick={onEditProfile}
                            ></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    name="profileCardsAddButton"
                    onClick={onAddPlace}
                ></button>
            </section>
            <section className="elements" > {
                cards.map((card) => {
                    return (<Card
                        card={card}
                        key={card._id}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={onCardClick}
                    />)
                })
            }
            </section>
        </main>
    );
}

export default Main;