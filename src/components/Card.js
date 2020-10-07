import React from 'react';


function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);   
    }

    return (
        <div className="place" key={card._id}>
            <button className="place__remove" type="button" aria-label="Удалить"></button>
            <img className="place__image" src={card.link} alt="" onClick={handleClick} />
            <div className="place__text">
                <h2 className="place__title">{card.name}</h2>
                <div className="like">
                    <button className="place__like" type="button" aria-label="Нравится"></button>
    <span className="place__like-count">{card.likes}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
