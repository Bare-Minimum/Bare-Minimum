import React from 'react';
import reducer from '../../Reducers';
import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

//stand in for current users added to trip
// selectedTrip.Users
let sampleUsersOnTrip = [
  {id: 1, name: 'Dan Dai'},
  {id: 2, name: 'Christie Villanueva'},
  {id: 3, name: 'Lara Ismael'}
];

//stand-in for current trip data
let sampleTripData = {
  id: 1,
  lodging: [],
  isopen: 1
};

class ExpenseTracker extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      expenseCost: 0,
      expenseDesc: '',
      userPaid: '',
      expenses: []
    };
    this.usersOnTrip = props.trip.Users;
    this.handleChanges = this.handleChanges.bind(this);
	}

  handleBack () {
    this.props.dispatch(reducer.changeView('TripDashboard'));
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
      description: this.state.expenseDesc
    };
    $.ajax({
      url: SERVER_URL + '/expense',
      method: 'POST',
      data: options,
      success: function(res) {
        console.log('Done posting');
      }
    })
  }

  changeSelectedUser (e) {
    this.setState({userPaid: e.target.value});
    console.log('Selected user is now', e.target.value);
  }

	render() {
		return(
			<div>
        <h1>Expenses Tracker</h1>
        <button onClick={this.handleBack.bind(this)}>Back</button>
        <div>Add an expense
          <form>
        	  <div>
        	    $<input type="number" name="amount" min="0" onChange={(e) => this.handleChanges('expenseCost', e)} step=".01" placeholder="0.00"/>
        	    <input type="text" name="description" onChange={(e) => this.handleChanges('expenseDesc', e)} placeholder="Description"/>
              Payer: <select value={this.state.userPaid} onChange={this.changeSelectedUser.bind(this)}>
                {this.usersOnTrip.map((user) => {
                  return <option value="{user.name}" key={user.id}>{user.name}</option>
                })}
              </select>
        	    <input onClick={this.submit.bind(this)} type="submit" value="Add Expense"/>
        	  </div>
          </form>
        </div>
        <div></div>
      </div>
		)
	}
}

let mapStateToProps = ({ trip }) => {
  return { trip };
}

export default connect(mapStateToProps)(ExpenseTracker);
