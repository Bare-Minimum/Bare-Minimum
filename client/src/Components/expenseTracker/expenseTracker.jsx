import React from 'react';
import reducer from '../../Reducers';
import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

//stand in for current users added to trip
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
      newUserPaid: '',
      expenses: []
    };
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
    $.post(SERVER_URL + '/expenses', JSON.stringify(options)).then((res) => {
      console.log('Posted new expense');
    }).catch((err) => {
      console.error('Error posting new expense', err);
    });
    // $.ajax({
    //   url: SERVER_URL + '/expenses',
    //   method: 'POST',
    //   data: JSON.stringify(options),
    //   success: function(res) {
    //     console.log('Done posting');
    //   }
    // })
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
