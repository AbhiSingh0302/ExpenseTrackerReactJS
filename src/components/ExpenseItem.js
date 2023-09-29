import { Button } from "react-bootstrap";

const ExpenseItem = props => {
    return <tr id={props.id}>
    <td>{props.amount}</td>
    <td>{props.item}</td>
    <td>{props.category}</td>
    <td>
        <Button className="me-2" onClick={props.onEdit}> Edit </Button>
        <Button onClick={props.onDelete}> Delete </Button>
    </td>
  </tr>
}

export default ExpenseItem;