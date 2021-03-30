import React from "react";
import { Link } from 'react-router-dom';

const Register = ({ handleRegister }) => {
    const [data, setData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
          const { password, email } = data;

          handleRegister(password, email);
      }

    return (
        <div className="register__page">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__data" id="form-name" name="email" value={data.email} onChange={handleChange} required type="email" placeholder="Email"/>
                <span className= "register__input-error" id='form-name-error' />
                <input className="register__data" id="form-job" name="password" required type="password" value={data.password} onChange={handleChange} placeholder="Пароль" />
                <span className= "register__input-error" id='form-job-error' />
                <button type="submit" className="register__link">Зарегистрироваться</button>
            </form>
            <div className="register__signin">
            <p>Уже зарегистрированы?</p>
            <Link to="sign-in" className="register__login-link">Войти</Link>
            </div>
        </div>

    )
}

export default Register;