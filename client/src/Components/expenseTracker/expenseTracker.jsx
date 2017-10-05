import React from 'react';
import reducer from '../../Reducers';
import { connect } from 'react-redux';

//stand in for current users added to trip
let sampleUsersOnTrip = [
  {name: 'Dan Dai'},
  {name: 'Christie Villanueva'},
  {name: 'Lara Ismael'}
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
	}

  handleBack () {
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

	render() {
		return(
			<div>
        <h1>Expenses Tracker</h1>
        <button onClick={this.handleBack.bind(this)}>Back</button>
        <div>Add an expense
          <form action="/expense" method="post">
        	  <div>
        	    $<input type="number" name="amount" min="0" step=".01" placeholder="0.00"/>
        	    <input type="text" name="description" placeholder="Description"/>
        	    <input type="submit" value="Add Expense"/>
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
