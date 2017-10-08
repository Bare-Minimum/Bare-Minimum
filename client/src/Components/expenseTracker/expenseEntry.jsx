import React from 'react';

const ExpenseEntry = (props) => (
  <div class="ExpenseEntry">{props.expense.description} - ${props.expense.amount}, paid for by {props.payer}</div>
)

export default ExpenseEntry;
