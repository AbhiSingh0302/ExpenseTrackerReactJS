import { useContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route, Redirect, Switch } from 'react-router-dom/cjs/react-router-dom';
import Profile from './components/Profile';
import { tokenContext } from './store/Context';
import ExpensePage from './components/ExpensePage';

function App() {
  const ctx = useContext(tokenContext);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      ctx.updateLogIn(localStorage.getItem("auth-token"));
    }
  }, [])

  const loginHandler = (token) => {
    localStorage.setItem("auth-token", token);
    ctx.updateLogIn(token);
  }
  console.log("ctx.isLoggedIn:", ctx.isLoggedIn);


  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" exact>
          {ctx.isLoggedIn ? <Redirect to="expense"/> : <Signup />}
        </Route>
        <Route path="/login">
          {ctx.isLoggedIn ? <Redirect to="expense"/> : <Login onLogin={loginHandler} />}
        </Route>
        <Route path="/profile">
        {ctx.isLoggedIn ? <Profile /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/expense">
        {ctx.isLoggedIn ? <ExpensePage /> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
