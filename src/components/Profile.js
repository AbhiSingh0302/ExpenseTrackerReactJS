import { Button, FloatingLabel, Form } from "react-bootstrap";
import './Profile.css';
import { useContext, useRef } from "react";
import { tokenContext } from "../store/Context";

const Profile = props => {
    const ctx = useContext(tokenContext);

    const nameRef = useRef("");
    const urlRef = useRef("");

    const submitHandler = e => {
        e.preventDefault();

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCtaqLuy8ActSmPWkPlYfnAB8plN4sO2lM`, {
        method: 'POST',
        body: JSON.stringify({
          idToken: ctx.token,
          displayName: nameRef.current.value,
          photoUrl: urlRef.current.value,
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

    return <Form className="profile" onSubmit={submitHandler}>
        <h3 className="text-center my-4">Complete Profile</h3>
        <FloatingLabel
            controlId="floatingInput"
            label="Full Name"
            className="mb-3"
        >
            <Form.Control placeholder="name@example.com" ref={nameRef} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Profile Photo URL" className="mb-3">
            <Form.Control placeholder="Password" ref={urlRef} required />
        </FloatingLabel>
        <div className="d-grid mb-3">
            <Button variant="primary" size="md" type="submit">
                Submit
            </Button>
        </div>
    </Form>
}

export default Profile;