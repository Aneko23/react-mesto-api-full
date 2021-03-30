import React from "react";
import { useHistory } from 'react-router-dom';

const Login = ({ handleLogin }) => {
    const [data, setData] = React.useState({
        username: '',
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
        const { email, password } = data;
        e.preventDefault();
        if (!email || !password){
          return;
        }

        handleLogin(email, password);
      }

    return (
        <div className="login__page">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__data" id="form-name" name="email" value={data.email} onChange={handleChange} required type="email" placeholder="Email"/>
                <span className= "login__input-error" id='form-name-error' />
                <input className="login__data" id="form-job" name="password" value={data.password} onChange={handleChange} required type="password" placeholder="Пароль" />
                <span className= "login__input-error" id='form-job-error' />
                <button type="submit" className="login__link">Войти</button>
            </form>
        </div>

    )
}

export default Login;