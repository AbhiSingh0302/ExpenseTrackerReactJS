import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [login, setLogin] = useState(false);

  const loginUserHandler = () => {
    setIsLogin(true);
  }

  const loginHandler = () => {
    setLogin(true);
  }

  return (
    <>
    <Header/>
    {!login && (isLogin ? <Login onLogin={loginHandler}/> : <Signup loginUser={loginUserHandler}/>)}
    {login && <h1 className='text-center'>Welcome to Expense Tracker</h1>}
    </>
  );
}

export default App;
