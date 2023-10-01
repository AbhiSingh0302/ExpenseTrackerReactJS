import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route, Redirect, Switch } from 'react-router-dom/cjs/react-router-dom';
import Profile from './components/Profile';
import ExpensePage from './components/ExpensePage';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      // ctx.updateLogIn(localStorage.getItem("auth-token"));
      dispatch(authActions.updateLogIn(localStorage.getItem("auth-token")))
    }
  }, [])

  console.log("ctx.isLoggedIn:", isLoggedIn);


  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Redirect to="/expense"/> : <Signup />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/expense"/> : <Login />}
        </Route>
        <Route path="/profile">
        {isLoggedIn ? <Profile /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/expense">
        {isLoggedIn ? <ExpensePage /> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
