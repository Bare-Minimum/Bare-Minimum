import React from 'react';

const ExpenseEntry = (props) => (
  <div className="ExpenseEntry">{props.expense.description} - ${props.expense.amount}, paid for by {props.payer}</div>
)

export default ExpenseEntry;
