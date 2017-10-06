import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

class ExpenseInput extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      expenseCost: 0,
      expenseDesc: '',
      userPaid: props.user.id
    };
    // this.usersOnTrip = this.getUsers();
    this.handleChanges = this.handleChanges.bind(this);
	}

  handleChanges (field, e) {
    if (field === 'expenseCost') {
      this.setState({expenseCost: e.target.value});
    } else {
      this.setState({expenseDesc: e.target.value});
    }
  }

  submit () {
    let options = {
      amount: this.state.expenseCost,
      description: this.state.expenseDesc,
      userId: this.state.userPaid,
      tripId: this.props.trip.id
    };
    let self = this;
    $.ajax({
      url: SERVER_URL + '/expense',
      method: 'POST',
      data: options,
      success: function(res) {
        console.log('Done posting');
        self.props.fetchExpenses();
      }
    });
    this.refs.amount.value = '';
    this.refs.desc.value = '';
  }

  changeSelectedUser (e) {
    this.setState({userPaid: e.target.value});
    console.log('Selected user is now', e.target.value);
  }

  render () {
    return (
      <div>
      $<input type="number" ref="amount" name="amount" min="0" onChange={(e) => this.handleChanges('expenseCost', e)} step=".01" placeholder="0.00"/>
        <input type="text" ref="desc" name="description" onChange={(e) => this.handleChanges('expenseDesc', e)} placeholder="Description"/>
        Payer: <select value={this.state.userPaid} onChange={this.changeSelectedUser.bind(this)}>
          {this.props.usersOnTrip.map((user) => {
            return <option value={user.id} key={user.id}>{user.name}</option>
          })}
        </select>
        <button onClick={this.submit.bind(this)} type="submit" >Add Expense</button>
      </div>);
  }
}

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
}

export default connect(mapStateToProps)(ExpenseInput);
