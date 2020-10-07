import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({onEditAvatar,onEditProfile, onAddPlace, onCardClick}) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(()=>{
        api.getUserInfo().then((userData) =>{
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
        })
    })
    React.useEffect(()=>{
        api.getItems().then((data) => {
            const items = data.map((item) => ({
                likes: item.likes.length,
                _id: item._id,
                name: item.name,
                link: item.link
            }))
            setCards(items)
        })
    }, [])
    
  return (
      <>
    <section className="profile page__content">
    <div className="profile__edit-avatar" onClick={onEditAvatar}>
      <img className="profile__avatar" src={userAvatar} alt="#"/>
    </div>
    <div className="profile__info">
      <div className="profile__conteiner">
  <h1 className="profile__name">{userName}</h1>
        <button className="profile__button-edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
      </div>
  <p className="profile__about">{userDescription}</p>
    </div>
    <button className="profile__button-add" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
  </section>
  <div className="places page__content">
  {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick}/>)}
  </div>
  </>
  )
}

export default Main;


