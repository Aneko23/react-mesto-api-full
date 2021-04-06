import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Logo from '../images/logo.svg';

export default function Header (props) {

    //console.log(props.userEmail)
    const logOut = () => {
        props.handleLogOut();
    }

    return (
    
    <header className="header-container"> 
        <div className="header">
            <img className="header__logo" src={Logo} alt="Логотип сайта" />
            <div className="container">
                <Switch>
                    <Route path='/cards'>
                        <p className="user-email_active">{props.userEmail}</p>
                        <button onClick={logOut} className="link__exit_active">Выход</button>
                    </Route>
                    <Route path="/sign-up">
                        <Link to="/sign-in" className="link_active">Войти</Link>
                    </Route>
                    <Route path="/sign-in">
                        <Link to="/sign-up" className="link_active">Регистрация</Link>
                    </Route>
                </Switch>
            </div>
        </div>
        <div className="header__line" /> 
    </header>
    )
}