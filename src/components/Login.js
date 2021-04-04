import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthUser from './AuthUser';
import * as auth from '../utils/auth';

function Login(props) {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const history = useHistory();

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        let { password, email } = userData;
        e.preventDefault();
        return auth.authorize(email, password)
            .then((data) => {
                if (!data) throw new Error('Неверные имя пользователя или пароль')
                if (data.token) {
                    props.authorized();
                    localStorage.setItem('jwt', data.token);
                    history.push('/');
                    return;
                }
            })
    }

    return (
        <AuthUser
            onSubmit={handleSubmit}
            valueEmail={userData.email}
            valuePassword={userData.password}
            changeEmail={handleChange}
            changePassword={handleChange}
            name='sign-in'
            title='Вход'
            textButton='Войти'>
        </AuthUser>
    )
}

export default Login
