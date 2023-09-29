import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import './Login.css';
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom"

const Login = props => {
  const history = useHistory();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loader, setLoader] = useState(false);

  const submitHandler = e => {
    e.preventDefault();

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtaqLuy8ActSmPWkPlYfnAB8plN4sO2lM`, {
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true
      })
    })
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
        console.log(data.idToken);
        props.onLogin(data.idToken);
      })
      .catch(err => {
        alert(err.message);
      })
  }

  const clickHandler = () => {
    history.replace("/");
  }

  const forgotPasswordHandler = () => {
    setLoader(true);
    if(emailRef.current.value.trim() !== ""){
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCtaqLuy8ActSmPWkPlYfnAB8plN4sO2lM`, {
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value,
        requestType: "PASSWORD_RESET"
      })
    })
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
        console.log(data);
        setLoader(false);
      })
      .catch(err => {
        alert(err.message);
        setLoader(false);
      })
    }else{
      alert("Please fill email");
      setLoader(false);
    }
  }

  return <Form className="login" onSubmit={submitHandler}>
    <h3 className="text-center my-4">Login</h3>
    <FloatingLabel
      controlId="floatingInput"
      label="Email address"
      className="mb-3"
    >
      <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPassword" label="Password">
      <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
    </FloatingLabel>
    <div className="d-grid my-2">
      {loader ? <Spinner animation="grow" variant="primary" className="m-auto"/> : <Button variant="link" onClick={forgotPasswordHandler}>Forgot password?</Button>}
    </div>
    <div className="d-grid mb-3">
      <Button variant="primary" size="md" type="submit">
        Login
      </Button>
    </div>
    <div className="d-grid">
      <Button variant="outline-secondary" size="md" onClick={clickHandler}>
        Create an account? Signup
      </Button>
    </div>
  </Form>
}

export default Login;