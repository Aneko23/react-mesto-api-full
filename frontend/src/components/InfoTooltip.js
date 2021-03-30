import React from 'react';
import Success from '../images/success.svg';
import Fail from '../images/fail.svg';

export default function InfoTooltip(props) {
        return (
            <div className={props.isOpen ? "popup popup_type_success popup_opened" : "popup popup_type_success"}>
                <form className={`popup__container popup__container_succes`} noValidate>
                    <img className="popup__aut-result" src={props.resultSuccess ? Success : Fail} alt={props.resultSuccess ? "Успешная регистрация" : "Неудачная регистрация"} />
                    <h2 className="popup__auth-title">{props.resultSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                    <button type="button" className="close-button" onClick={props.onClosePopup} />
                </form>
            </div> 
        )
}