const ExpenseItem = props => {
    return <tr>
    <td>{props.amount}</td>
    <td>{props.item}</td>
    <td>{props.category}</td>
  </tr>
}

export default ExpenseItem;