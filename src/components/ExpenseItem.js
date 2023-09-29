const ExpenseItem = props => {
    return <tr key={props.id}>
    <td>{props.amount}</td>
    <td>{props.item}</td>
    <td>{props.category}</td>
  </tr>
}

export default ExpenseItem;