import React from "react";
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {

  //Обновляю поля после закрытия попапа
  React.useEffect(() => {
    if (props.onClose) {
      linkRef.current.value = '';
    }
}, [props.onClose])

    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: linkRef.current.value,
        });
      } 

    return (
        <PopupWithForm name='avatar' title='Обновить аватар' submit='Сохранить' isOpen={props.isOpen} onClose={props.onClose} onClosePopup={props.onClosePopup} onSubmit={handleSubmit}>
            <input className="popup__data popup__data_link" id="form-link" placeholder="Ссылка на картинку" type="url" name="linkInput" required ref={linkRef} />
            <span className= "popup__input-error" id='form-link-error' />
        </PopupWithForm>
    )
}