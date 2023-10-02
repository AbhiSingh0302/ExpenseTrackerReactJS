import { useRef, useState } from "react"
import { Button, Container, Form, Row, Col, FloatingLabel, Table, Spinner } from "react-bootstrap"
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense";
import { themeActions } from "../store/theme";

const ExpensePage = props => {
  const expenses = useSelector(state => state.expense.expenses);
  const totalAmount = useSelector(state => state.expense.total);
  const darkMode = useSelector(state => state.theme.darkMode);

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const token = useSelector(state => state.auth.isLoggedIn);

  const amountRef = useRef("");
  const itemRef = useRef("");
  const categoryRef = useRef("");

  

  const clickHandler = () => {
    // Email Verification
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCtaqLuy8ActSmPWkPlYfnAB8plN4sO2lM', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: token
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
    try {  
      const res = await fetch(`https://ecommerce-project-d4a80-default-rtdb.firebaseio.com/expenses/${editItemId}.json`,{
        method: 'PUT',
        body: JSON.stringify({amount: amountRef.current.value,
          item: itemRef.current.value,
          category: categoryRef.current.value,
          id: editItemId})
      });
      const response = await res.json();
      console.log(response);
      if (response && response.error && response.error.message) {
        let errorMessage = response.error.message;
        throw new Error(errorMessage);
      }else{
      //  setExpenses(pre => [...pre,
        // {amount: response.amount,
        // item: response.item,
        // category: response.category,
        // id: editItemId}
      // ])
      dispatch(expenseActions.editExpenses(
        {amount: response.amount,
          item: response.item,
          category: response.category,
          id: editItemId}
      ));
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
      setIsEditable(false);
      setEditItemId(null);
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
      console.log(data);
      console.log(data.name);
      dispatch(expenseActions.addExpenses([
        {
          amount: amountRef.current.value,
          item: itemRef.current.value,
          category: categoryRef.current.value,
          id: data.name
        }
      ]))
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
        dispatch(expenseActions.deleteExpense(itemId));
        setLoader(false);
      }
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }
  }

  const premiumHandler = () => {
    dispatch(themeActions.toggleTheme());
  }
  
  const downloadCSVFile = (csv_data) => {
  
      // Create CSV file object and feed
      // our csv_data into it
      const CSVFile = new Blob([csv_data], {
          type: "text/csv"
      });
  
      // Create to temporary link to initiate
      // download process
      var temp_link = document.createElement('a');
  
      // Download csv file
      temp_link.download = "expense.csv";
      var url = window.URL.createObjectURL(CSVFile);
      temp_link.href = url;
  
      // This link should not be displayed
      temp_link.style.display = "none";
      document.body.appendChild(temp_link);
  
      // Automatically click the link to
      // trigger download
      temp_link.click();
      document.body.removeChild(temp_link);
  }

  const tableToCSV = () => {
 
    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length-1; j++) {

            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file 
    downloadCSVFile(csv_data);

}


  return <section style={{backgroundColor: darkMode ? "black" : "white", padding: "1rem 5rem"}}>
    <h1 className="text-center" style={{color: darkMode ? "white" : "black"}}>Welcome to expense tracker</h1>
    <div className="text-center">
      <Button onClick={clickHandler}>Verify Email</Button>
    </div>
    {totalAmount>10000 && <div className="text-center" style={{margin: "0.5rem"}}>
      <Button onClick={premiumHandler} className="mx-2">Activate Premium</Button>
      <Button onClick={tableToCSV} className="mx-2">Download Expense</Button>
    </div>}
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

    <Table striped bordered hover variant={darkMode ? "light" : "dark"} className="mt-3">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Item</th>
          <th>Category</th>
          <th></th>
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
  </section>
}

export default ExpensePage;