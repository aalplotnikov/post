import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context';
import MyButton from '../UI/button/MyButton';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <MyButton
        onClick={logout}
      >
        Выйти
      </MyButton>
      <div className='navbar__links'>
        <Link to='/about'>О нас</Link>
        <Link to='/posts'>Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;