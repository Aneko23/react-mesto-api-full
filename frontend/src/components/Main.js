import React from "react";
import Pencil from '../images/Edit-pencil.svg';
import ImagePopup from './ImagePopup';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
    const [isOnMouseOver, setOnMouseOver] = React.useState(false);

    const currentUser = React.useContext(CurrentUserContext);

    function onMouseOverAvatar() {
        setOnMouseOver(true);
    }

    function onMouseOutAvatar() {
        setOnMouseOver(false);
    }

    return (
        <main>
            <section className="profile">
                <div className="profile__detail">
                    <div className="avatar" onMouseOver={onMouseOverAvatar} onMouseOut={onMouseOutAvatar} onClick={props.onEditAvatar}>
                        <div className={isOnMouseOver?`profile__avatar profile__avatar_dark`:`profile__avatar`} style={{ backgroundImage: `url(${currentUser.avatar})` }}  />
                        <img className={isOnMouseOver?`edit-pencil edit-pencil_active`:`edit-pencil`} src={Pencil} alt="Иконка редактирования" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" onClick={props.onEditProfile} className="edit-button" />
                        <p className="profile__work">{currentUser.about}</p>
                    </div>    
                </div>  
                <button type="button" onClick={props.onAddPlace} className="add-button" />
            </section>
            <ImagePopup card={props.selectedCard} onClose={props.onClose} onClosePopup={props.onClosePopup}/>
            <ul className="elements">
            {props.cards.map((card) => (
               <Card 
                card={card}
                link={card.link}
                name={card.name}
                likes={card.likes.length}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                openDeletePopup={props.openDeletePopup}
               >
               </Card>
            ))
            }
            </ul>
            </main>
    )
    }