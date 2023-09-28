import { useContext } from "react"
import { Button, Container } from "react-bootstrap"
import { tokenContext } from "../store/Context"

const ExpensePage = props => {
    const ctx = useContext(tokenContext);

    const clickHandler = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCtaqLuy8ActSmPWkPlYfnAB8plN4sO2lM', {
        method: 'POST',
        body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: ctx.token
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

    return <Container className="w-75">
        <h1 className="text-center">Welcome to expense tracker</h1>
        <div className="text-center">
            <Button onClick={clickHandler}>Verify Email</Button>
        </div>
    </Container>
}

export default ExpensePage;