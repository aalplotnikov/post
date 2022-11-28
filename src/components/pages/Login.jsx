import React, {useContext} from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import {AuthContext} from '../../context';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const {setIsAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
    navigate('/posts');
  };
  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type='text' placeholder={'Введите логин'}/>
        <MyInput type='password' placeholder={'Введите пароль'}/>
        <MyButton>
          Войти
        </MyButton>
      </form>
    </div>
  );
};

export default Login;