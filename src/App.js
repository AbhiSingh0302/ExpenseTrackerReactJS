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
import { expenseActions } from "./store/expense";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      dispatch(authActions.updateLogIn(localStorage.getItem("auth-token")))
    }
      // GET all the expenses at once when the page reloads
      fetch('https://ecommerce-project-d4a80-default-rtdb.firebaseio.com/expenses.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(data => {
          let errorMessage = 'Authentication Failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      })
      .then(data => {
        const expensesArray = [];
        for(let d in data){
          expensesArray.push({...data[d], id: d});
        }
        dispatch(expenseActions.addExpenses(expensesArray))
      })
      .catch(err => {
        alert(err.message);
      })
  }, [])

  console.log("islogged in", isLoggedIn);

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
