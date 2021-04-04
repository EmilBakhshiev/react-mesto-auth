import React, { useState } from 'react';
import AuthUser from './AuthUser';
import * as auth from '../utils/auth';

function Register() {
    const [userData, setUserData] = useState({
        email:'',
        password:'',
    })

function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
        ...userData,
        [name]: value  
    });
}
    function handleSubmit(e){
        let {password, email } = userData;
        e.preventDefault();
        return  auth.register(email, password)
          .then((res) => {
            if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
            return res;
          }).catch()
      }

    return (
        <AuthUser
        onSubmit={handleSubmit}
        valueEmail={userData.email}
        valuePassword={userData.password}
        changeEmail={handleChange}
        changePassword={handleChange}
        name='sign-up'
        title='Регистрация'
        textButton='Зарегистрироваться'>
    </AuthUser>
    )
}

export default Register;
