import { useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Profile from './components/Profile';
import { tokenContext } from './store/Context';

function App() {
  const ctx = useContext(tokenContext);

  const loginHandler = (token) => {
    console.log("app.js",token);
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
        <Profile/>
      </Route>
    </>
  );
}

export default App;
