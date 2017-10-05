import React from 'react';

const ExpenseEntry = (props) => (
  <div>{props.expense.description} - ${props.expense.amount}</div>
)

export default ExpenseEntry;
