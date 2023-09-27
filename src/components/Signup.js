import { Button, FloatingLabel, Form } from "react-bootstrap";
import './Signup.css';
import { useRef } from "react";
import {useHistory} from "react-router-dom"

const Signup = props => {
  const history = useHistory();
  
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const submitHandler = e => {
    e.preventDefault();
    
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("password do not match")
    } else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtaqLuy8ActSmPWkPlYfnAB8plN4sO2lM`, {
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
          console.log(data);
        })
        .catch(err => {
          alert(err.message);
        })
    }
  }

  const clickHandler = () => {
    history.replace("/login");
  }

  return <Form className="signup" onSubmit={submitHandler}>
    <h3 className="text-center my-4">SignUp</h3>
    <FloatingLabel
      controlId="floatingInput"
      label="Email address"
      className="mb-3"
    >
      <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
      <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPassword2" label="Confirm Password" className="mb-3">
      <Form.Control type="password" placeholder="Password" ref={confirmPasswordRef} required />
    </FloatingLabel>
    <div className="d-grid mb-3">
      <Button variant="primary" size="md" type="submit">
        Sign Up
      </Button>
    </div>
    <div className="d-grid">
      <Button variant="outline-secondary" size="md" onClick={clickHandler}>
        Have an account? Login
      </Button>
    </div>
  </Form>
}

export default Signup;