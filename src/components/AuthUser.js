import React from 'react';
import {Link} from 'react-router-dom';


function AuthUser(props) {
    return (
        <form className='auth' name={props.name} noValidate>
        <h2 className='auth__title'>{props.title}</h2>
        <input  type="email" className="auth__input" name="email" id="email" placeholder="Email" required />
        <span id="email-error" className="error"></span>
        <input type="password" className="auth__input" name="password" id="password" placeholder="Пароль" required />
        <span id="password-error" className="error"></span>
        <button className='auth__button' type='submit'>{props.textButton}</button>
        {(props.name == 'sign-up')? <Link className='auth__link' exact to='/sign-in'>Уже зарегистрированы? Войти</Link>:''}
    </form>
    )
}

export default AuthUser;
