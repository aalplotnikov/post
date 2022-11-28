import React, {useEffect, useState} from 'react';
import './styles/App.css';
import Navbar from './components/navbar/Navbar';
import AppRouter from './components/AppRouter';
import {AuthContext} from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
    }}>
        <Navbar/>
        <AppRouter/>
    </AuthContext.Provider>
  );
}

export default App;
