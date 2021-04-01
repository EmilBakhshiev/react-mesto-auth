import React from 'react'
import AuthUser from './AuthUser';

function Login() {
    return (
        <AuthUser
        name='sign-in'
        title='Вход'
        textButton='Войти'>
        <input  type="email" className="auth__input" name="email" id="sign-in-email" placeholder="Email" required />
        <span id="sign-in-email-error" className="error"></span>
        <input type="password" className="auth__input" name="password" id="sign-in-password" placeholder="Пароль" required />
        <span id="sign-in-password-error" className="error"></span>
    </AuthUser>
    )
}

export default Login
