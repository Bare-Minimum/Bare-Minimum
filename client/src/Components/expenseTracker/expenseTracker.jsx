import React from 'react';
import reducer from '../../Reducers';
import ExpenseEntry from './expenseEntry.jsx';
import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

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
      userPaid: props.user.id,
      expenses: [],
      totalExpense: 0,
      usersOnTrip: []
    };
    // this.usersOnTrip = this.getUsers();
    this.handleChanges = this.handleChanges.bind(this);
	}

  handleBack () {
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  getUsers() {
    let options = {
      url: HOSTNAME + '/tripusers/' + this.props.trip.id,
      success: (data) => {
        console.log('successful GET - Userlist', data);
        this.setState({
          usersOnTrip: data
        });
      },
      error: (data) => {
        console.log('FAILED GET - Userlist', data);
      }
    }

    $.ajax(options);
  }

  handleChanges (field, e) {
    if (field === 'expenseCost') {
      this.setState({expenseCost: e.target.value});
    } else {
      this.setState({expenseDesc: e.target.value});
    }
  }

  componentDidMount () {
    this.fetchExpenses();
    this.getUsers();
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
        self.fetchExpenses();
      }
    });
    this.refs.amount.value = '';
    this.refs.desc.value = '';
  }

  fetchExpenses () {
    console.log('Fetching expense list');
    let options = { tripId: this.props.trip.id };
    let self = this;
		$.ajax({
			url: SERVER_URL + '/expense',
			data: options,
      method: 'GET',
			success: function(res) {
				self.setState({ expenses: res });
        self.setState({ totalExpense: res.reduce((acc, currExp) => {
          return acc + currExp.amount;
        }, 0).toFixed(2) })
			}
		});
  }

  changeSelectedUser (e) {
    this.setState({userPaid: e.target.value});
    console.log('Selected user is now', e.target.value);
  }

  findUser (userId) {
    for (var user of this.state.usersOnTrip) {
      if (user.id === userId) {
        return user.name;
      }
    }
  }

	render() {
		return(
			<div>
        <h1>Expenses Tracker</h1>
        <button onClick={this.handleBack.bind(this)}>Back</button><br />
        <div>Add an expense

      	  <div>
      	    $<input type="number" ref="amount" name="amount" min="0" onChange={(e) => this.handleChanges('expenseCost', e)} step=".01" placeholder="0.00"/>
      	    <input type="text" ref="desc" name="description" onChange={(e) => this.handleChanges('expenseDesc', e)} placeholder="Description"/>
            Payer: <select value={this.state.userPaid} onChange={this.changeSelectedUser.bind(this)}>
              {this.state.usersOnTrip.map((user) => {
                return <option value={user.id} key={user.id}>{user.name}</option>
              })}
            </select>
      	    <button onClick={this.submit.bind(this)} type="submit" >Add Expense</button>
      	  </div>
          <hr />
          <div>
            <h4>Current Expenses</h4>
            {this.state.expenses.map((item) => {
              return <ExpenseEntry expense={item} key={item.id} payer={this.findUser(item.userId)}/>
            })}
            <h4>Total Cost</h4> ${this.state.totalExpense}
          </div>

        </div>
        <div></div>
      </div>
		)
	}
}

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
}

export default connect(mapStateToProps)(ExpenseTracker);
