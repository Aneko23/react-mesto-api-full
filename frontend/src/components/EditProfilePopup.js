import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');

//Обновляю значение name
    function handleChangeName(e) {
       setName(e.target.value);
    }

//Обновляю значение description
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

//Сохраняю изменения
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name: name,
          about: description,
        });
      } 

//Дублирую данные профиля в инпут
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser]);

//Обновляю поля после закрытия попапа
    React.useEffect(() => {
        if (props.onClose) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.onClose, currentUser])

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' submit='Сохранить' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} onClosePopup={props.onClosePopup}>
            <input className="popup__data popup__data_name" id="form-name" value={name || ''} onChange={handleChangeName} required minLength="2" maxLength="40" type="text" name="nameInput" />
            <span className= "popup__input-error" id='form-name-error' />
            <input className="popup__data popup__data_job" id="form-job" value={description || ''} onChange={handleChangeDescription} required minLength="2" maxLength="200" type="text" name="jobInput" />
            <span className= "popup__input-error" id='form-job-error' />
        </PopupWithForm>

    )
}