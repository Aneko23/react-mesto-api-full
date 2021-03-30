import React from 'react';

export default function ImagePopup(props) {
    
    return (
            <div className={!props.card.isPopupOpened?`popup popup_type_image`:`popup popup_type_image popup_opened`}>
                <div className="popup__box">
                    <img className="popup__pic" src={props.card.link} alt={props.card.name} />
                    <h3 className="popup__name">{props.card.name}</h3>
                    <button type="button" className="close-button" onClick={props.onClosePopup} />
                </div>
            </div>
    )
}