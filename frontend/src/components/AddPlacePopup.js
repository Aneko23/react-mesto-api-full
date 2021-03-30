import React from "react";
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
    const [place, setPlace] = React.useState('');
    const [url, setUrl] = React.useState('');

//Обновляю поля после закрытия попапа
    React.useEffect(() => {
        if (props.onClose) {
            setPlace('');
            setUrl('');
        }
    }, [props.onClose])

//Изменяю значение поля "название"
    function changePlace(e) {
        setPlace(e.target.value);
    }

//Изменяю значение поля "ссылка"
    function changeLink(e) {
        setUrl(e.target.value);
    }

//Обработчик события
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: place,
            link: url
        })
    }


    return (
        <PopupWithForm name='place' title='Новое место' submit='Добавить' isOpen={props.isOpen} onClose={props.onClose} onClosePopup={props.onClosePopup} onSubmit={handleSubmit} >
            <input className="popup__data popup__data_place" id="form-place" type="text" placeholder="Название" value={place} onChange={changePlace} name="placeInput" required minLength="2" maxLength="30" />
            <span className= "popup__input-error" id='form-place-error' />
            <input className="popup__data popup__data_link" id="form-link" placeholder="Ссылка на картинку" value={url} onChange={changeLink} type="url" name="linkInput" required />
            <span className= "popup__input-error" id='form-link-error' />
        </PopupWithForm>
    )
}