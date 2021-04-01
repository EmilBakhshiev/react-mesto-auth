import React from 'react';
import AuthUser from './AuthUser';

function Register() {
    return (
        <AuthUser
        name='sign-up'
        title='Регистрация'
        textButton='Зарегистрироваться'>
        <input  type="email" className="auth__input" name="email" id="sign-up-email" placeholder="Email" required />
        <span id="sign-up-email-error" className="error"></span>
        <input type="password" className="auth__input" name="password" id="sign-up-password" placeholder="Пароль" required />
        <span id="sign-up-password-error" className="error"></span>
    </AuthUser>
    )
}

export default Register;
