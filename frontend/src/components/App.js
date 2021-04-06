import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import * as auth from '../utils/auth';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

export default function App() {
  const [onClose, closeAllPopups] = React.useState(true);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isPopupOpened: false});
  const [currentUser, setCurrentUser] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [removedCard, setRemovedCard] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [resultSuccess, setResultSuccess] = React.useState(false);
  const [isOpen, setPopupOpen] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState('')

  const history = useHistory();

  // Проверяю токен прикаждом обновлении
  React.useEffect(() => {
    tokenCheck();
  }, [history])

  // Перевожу на страницу, если пользователь зарегистрирован
  React.useEffect(() => {
    if (loggedIn) {
      history.push('/cards');
    }
  }, [loggedIn])

  // Функция регистрации
  const handleRegister = (password, email) => {
    auth.register(password, email)
    .then((res) => {
        history.push('/sign-in');
        setPopupOpen(true);
        loginSuccess();
  })
    .catch((error) => {
      console.log(error);
      setPopupOpen(true);
}); 
  }

  // Обновляю значение при успешном входе
  const loginSuccess = () => {
    setResultSuccess(true);
  }

  // Функция авторизации
  const handleLogin = (email, password) => {
    auth.authorize(email, password)
        .then((data) => {
          console.log(data)
            localStorage.setItem('jwt', data.token);
            setLoggedIn(true);
            setUserEmail(email);
            setCurrentUser(data.user);
            history.push('/cards');
        })
        .catch((error) => {
          console.log(error);
  }); 
  }

  // Функция проверки токена
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res){
          history.push('/cards');
        }
      }); 
    } else {
      console.log({message: 'Токен не передан или передан не в том формате'})
    }
  }

  //Получаю данные пользователя с сервера
  React.useEffect(() => {
    api.getUserProfile()
    .then(res => {
      setCurrentUser(res.data);
      setUserEmail(res.data.email);
    })
    .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    })
  }, []);

  // Функция выхода из приложения
  const handleLogOut = () => {
    const jwt = localStorage.getItem('jwt');
    localStorage.removeItem('jwt');

    history.push('/sign-in');
  }

  // Закрываю попапы
  React.useEffect(() => {
    if (onClose) {
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setDeleteCardPopupOpen(false);
      setResultSuccess(false);
      setPopupOpen(false);
    }
  }, [onClose])

//Получаю гелерею с сохранёнными карточками
    React.useEffect(() => {
      api.getCards()
      .then(res => {
        setCards(res.reverse())
      })
      .catch((error) => {
          console.log(`Возникла ошибка: ${error}`)
      })
    }, []);
  
//Функция для клика по сердечку
    function handleCardLike(card) {
      const isLiked = card.likes.some(function(elem){
        return elem === currentUser._id
      });
      api.clickLike(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    })
  }
  
//Функция удаления карточки
      function handleCardDelete(card) {
          api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c.owner._id === card.owner._id);
                //Обновляю список карточек
                api.getCards()
                .then(res => {
                  setCards(res)
                })
                .catch((error) => {
                   console.log(`Возникла ошибка: ${error}`)
                })
                handleCloseAllPopups();
                return newCards;
            })
            .catch((error) => {
              console.log(`Возникла ошибка: ${error}`)
          });
      }
  
//Функция для открытия попапа с картинкой
  function handleCardClick(card) {
    setSelectedCard({
      isPopupOpened: true,
      name: card.name,
      link: card.link
    });
  }

//Функция для открытия попапа для редактирования аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    closeAllPopups(false);
}

//Функция для открытия попапа для редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    closeAllPopups(false);
  }

//Функция для открытия попапа для добавления новых карточек
  function handleAddPlaceClick() {
      setAddPlacePopupOpen(true);
      closeAllPopups(false);
  }

//Функция для открытия попапа с подтверждением об удалении карточки
  function handleDeleteCardClick(card) {
    setRemovedCard(card);
    setDeleteCardPopupOpen(true);
    closeAllPopups(false);
  }

//Функция для закрытия всех попапов
  function handleCloseAllPopups() {
    closeAllPopups(true);
    setSelectedCard({});
  }

//Функция для обновления данных о пользователе
  function handleUpdateUser(data) {
    api.setUserProfile(data.name, data.about)
    .then(res => {
      setCurrentUser(res);
      handleCloseAllPopups();
    })
    .catch((err) => {
        console.log(`Возникла ошибка: ${err}`)
    });
  }

//Функция добавления новой карточки
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard.name, newCard.link)
        .then(card => {
            setCards([card, ...cards]);
            handleCloseAllPopups();
    })
    .catch((err) => console.log (`Возникла ошибка: ${err}`));
  }

//Функция для обновления аватара
  function handleUpdateAvatar(card) {
    api.changeUserAvatar(card.avatar)
    .then(res => {
      setCurrentUser(res);
      handleCloseAllPopups();
    })
    .catch(err => {
      console.log(`Возникла ошибка: ${err}`)
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
          <Switch>
          <div className="root">
            <div className="page">
            <Header userEmail={userEmail} handleLogOut={handleLogOut} />
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
              <InfoTooltip isOpen={isOpen} onClose={onClose} onClosePopup={closeAllPopups} resultSuccess={resultSuccess} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
              <InfoTooltip isOpen={isOpen} onClose={onClose} onClosePopup={closeAllPopups} resultSuccess={resultSuccess} />
            </Route>
            <ProtectedRoute path="/cards" loggedIn={loggedIn} component={Main, EditProfilePopup, AddPlacePopup, EditAvatarPopup, DeleteCardPopup} />
            <Route path="/cards">
              <Main
                cards={cards}
                onAddPlace={handleAddPlaceClick} 
                onEditProfile={handleEditProfileClick} 
                onEditAvatar={handleEditAvatarClick} 
                onClose={onClose} 
                onClosePopup={handleCloseAllPopups}
                selectedCard={selectedCard}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                openDeletePopup={handleDeleteCardClick}
              />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={onClose} onClosePopup={closeAllPopups} onUpdateUser={handleUpdateUser}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={onClose} onClosePopup={closeAllPopups} onAddPlace={handleAddPlaceSubmit} /> 
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={onClose} onClosePopup={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
              <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={onClose} onClosePopup={closeAllPopups} cardDelete={handleCardDelete} removedCard={removedCard} />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={onClose} onClosePopup={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
            </Route>
            <Footer />
            </div>
      </div>
      </Switch>
    </CurrentUserContext.Provider>
  );
}
