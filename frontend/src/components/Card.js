import React from 'react';
import Trash from "../images/Trash.svg";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        props.onCardClick(props.card);
      }  

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.openDeletePopup(props.card);
    }

    return (
        <div className="element">
            <li className= "element__card">
                <button type="button" className={`delete-button ${isOwn ? 'delete-button_active' : 'delete-button_inactive'}`}><img  src={Trash} alt="Иконка удаления" onClick={handleDeleteClick} /></button>
                <img className="element__image" onClick={handleClick} src={props.link} alt={props.name} />
                <div className="element__detail">
                    <h3 className="element__name">{props.name}</h3>
                        <div className="element__likes">
                            <button type="button" className={`button-like ${isLiked && 'button-like_active'}`} onClick={handleLikeClick} />
                            <p className= "like-counter">{props.likes}</p>
                        </div>
                </div>
            </li> 
        </div>
    )
}