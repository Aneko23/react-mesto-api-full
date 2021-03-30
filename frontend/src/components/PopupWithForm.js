import React from "react";

export default function PopupWithForm(props) {
    return (
        <div className={!props.isOpen || props.onClose?`popup popup_type_${props.name}`:`popup popup_type_${props.name} popup_opened` }>
            <form className={`popup__container popup__container_${props.name}`} noValidate onSubmit={props.onSubmit}>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button className="submit-button" type="submit" name="SubmitButton">{props.submit}</button>
                <button type="button" className="close-button" onClick={props.onClosePopup} />
            </form>
        </div> 
    )

}