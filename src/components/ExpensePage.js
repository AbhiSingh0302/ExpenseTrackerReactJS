import { useContext, useEffect, useRef, useState } from "react"
import { Button, Container, Form, Row, Col, FloatingLabel, Table, Spinner } from "react-bootstrap"
import { tokenContext } from "../store/Context";
import ExpenseItem from "./ExpenseItem";

const ExpensePage = props => {
  const [expenses, setExpenses] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const ctx = useContext(tokenContext);

  const amountRef = useRef("");
  const itemRef = useRef("");
  const categoryRef = useRef("");

  useEffect(() => {
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
      // console.log(data);
      const expensesArray = [];
      for(let d in data){
        // console.log(data[d]);
        expensesArray.push({...data[d], id: d});
      }
      // console.log(expensesArray);
      setExpenses(pre => [...pre, ...expensesArray]);
    })
    .catch(err => {
      alert(err.message);
    })
  },[])

  const clickHandler = () => {
    // Email Verification
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

  const editExpense = async () => {
    // editting the expense
    try {  
      const res = await fetch(`https://ecommerce-project-d4a80-default-rtdb.firebaseio.com/expenses/${editItemId}.json`,{
        method: 'PUT',
        body: JSON.stringify({amount: amountRef.current.value,
          item: itemRef.current.value,
          category: categoryRef.current.value,
          id: Math.random()})
      });
      const response = await res.json();
      console.log(response);
      if (response && response.error && response.error.message) {
        let errorMessage = response.error.message;
        throw new Error(errorMessage);
      }else{
       setExpenses(pre => [...pre,
        {amount: response.amount,
        item: response.item,
        category: response.category,
        id: editItemId}
      ])
      amountRef.current.value="";
      itemRef.current.value="";
      categoryRef.current.value="";

      setLoader(false);
      setIsEditable(false);
      setEditItemId(null);
      }
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }
  }

  const submitHandler = e => {
    setLoader(true);
    e.preventDefault();

    if(isEditable){
      editExpense();
    }
    else
    {
    fetch('https://ecommerce-project-d4a80-default-rtdb.firebaseio.com/expenses.json',{
      method: 'POST',
      body: JSON.stringify({amount: amountRef.current.value,
        item: itemRef.current.value,
        category: categoryRef.current.value,
        id: Math.random()})
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
      console.log(data.name);
      setExpenses(pre => [...pre,
        {amount: amountRef.current.value,
        item: itemRef.current.value,
        category: categoryRef.current.value,
        id: data.name}
      ])
      amountRef.current.value="";
      itemRef.current.value="";
      categoryRef.current.value="";

      setLoader(false);
    })
    .catch(err => {
      alert(err.message);
      setLoader(false);
    })
  }
  }

  const editHandler = e => {
    setEditItemId(e.target.parentElement.parentElement.id);
    const item = expenses.find(ele => ele.id === e.target.parentElement.parentElement.id)
    amountRef.current.value = item.amount;
    itemRef.current.value = item.item;
    categoryRef.current.value = item.category;
    // e.target.parentElement.parentElement.remove();
    setExpenses(pre => pre.filter(ele => ele.id !== e.target.parentElement.parentElement.id))
    setIsEditable(true);
  }

  const deleteHandler = async e => {
    try { 
      const itemId = e.target.parentElement.parentElement.id
      const res = await fetch(`https://ecommerce-project-d4a80-default-rtdb.firebaseio.com/expenses/${itemId}.json`,{
        method: 'DELETE'
      });
      const response = await res.json();
      console.log(response);
      if (response && response.error && response.error.message) {
        let errorMessage = response.error.message;
        throw new Error(errorMessage);
      }else{
        setExpenses(pre => pre.filter(ele => ele.id !== itemId))
        setLoader(false);
      }
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }
  }

  return <Container className="w-75">
    <h1 className="text-center">Welcome to expense tracker</h1>
    <div className="text-center">
      <Button onClick={clickHandler}>Verify Email</Button>
    </div>

    <Form className="mt-3 bg-primary p-3" onSubmit={submitHandler}>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid1" label="Expense Amount">
            <Form.Control type="number" placeholder="name@example.com" ref={amountRef}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputGrid2" label="Expense Description">
            <Form.Control placeholder="name@example.com" ref={itemRef}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Expense Category"
          >
            <Form.Select aria-label="Floating label select example" ref={categoryRef}>
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="fuel">Fuel</option>
              <option value="shopping">Shopping</option>
              <option value="miscellaneous">Miscellaneous</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col style={{ alignSelf: "center" }}>
          <Button type="submit" variant="warning">{isEditable ? 'Update Expense' : 'Add Expense'}</Button>
          {loader && <Spinner animation="border" variant="warning" style={{position: "relative", top: "7px", left: "5px"}}/>}
        </Col>
      </Row>
    </Form>

    <Table striped bordered hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Item</th>
          <th colSpan={2}>Category</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(expense => (
          <ExpenseItem
          key={expense.id} 
          id={expense.id} 
          amount={expense.amount} 
          item={expense.item} 
          category={expense.category}
          onEdit={editHandler}
          onDelete={deleteHandler}/>
        ))}
      </tbody>
    </Table>
  </Container>
}

export default ExpensePage;