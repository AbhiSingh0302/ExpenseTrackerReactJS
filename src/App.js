import { useContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route, useHistory, Redirect } from 'react-router-dom/cjs/react-router-dom';
import Profile from './components/Profile';
import { tokenContext } from './store/Context';

function App() {
  const history = useHistory();

  const ctx = useContext(tokenContext);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      ctx.updateLogIn(localStorage.getItem("auth-token"));
      history.replace('/profile')
    }
  }, [])

  const loginHandler = (token) => {
    localStorage.setItem("auth-token", token);
    ctx.updateLogIn(token);
  }

  return (
    <>
      <Header loggedIn={ctx.isLoggedIn} />
      <Route path="/" exact>
        <Signup />
      </Route>
      <Route path="/login">
        {!ctx.isLoggedIn && <Login onLogin={loginHandler} />}
        {ctx.isLoggedIn && <h1>Welcome to expense tracker</h1>}
      </Route>
      <Route path="/profile">
        {ctx.isLoggedIn && <Profile />}
        {!ctx.isLoggedIn && <Redirect to="/login"/>}
      </Route>
    </>
  );
}

export default App;
