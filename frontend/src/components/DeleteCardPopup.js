import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
      
        props.cardDelete(props.removedCard);
      } 

    return (
        <PopupWithForm name='delete' title='Вы уверены?' submit='Да' isOpen={props.isOpen} onClose={props.onClose} onClosePopup={props.onClosePopup} onSubmit={handleSubmit} />
    )
}