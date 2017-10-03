import React from 'react';
import ReactDOM from 'react-dom';
import TripManager from './components/tripManager/tripManager.jsx';
import TripDashboard from './components/tripDashboard/tripDashboard.jsx';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducers';
const store = createStore(reducer.travelReducer);
const { getState } = store;
import { connect } from 'react-redux';

/*
TEST COMPONENT APP VIEWS =======================================================
Replace with final components in Dashboard component
*/

const TestTripManager = (props) => {
	function handleClick(e) {
		// props.onSelectView();
		store.dispatch(reducer.changeView('TripDashboard'));
		store.dispatch(reducer.changeTrip(e.target.value));
	}
	return (
		<div>
			<h1>Trip Manager</h1>
			Test Trip Manager Won't Approve Raises<br />
			<button onClick={(e) => handleClick(e)} value="Mexico City 2022">Mexico City</button>
			<button onClick={(e) => handleClick(e)} value="Helsinki 1984">Helsinki</button>
			<button onClick={(e) => handleClick(e)} value="Mumbai 2056">Mumbai</button>
		</div>
	);
};

const TestTripDashboard = (props) => {
	function handleClick() {
		store.dispatch(reducer.changeView('TripManager'));
	}
	return (
		<div>
			<h1>Trip Dashboard</h1>
			<h3>{store.getState().trip}</h3>
			Test Trip Dashboard is Dashing<br />
			<button onClick={handleClick}>Return to Manager</button>
		</div>
	);
};
/*
END TEST COMPONENT APP VIEWS ===================================================
*/

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		//Listen to changes in the redux store
		store.subscribe(() => {this.setState({reload:false})});
	}
	render() {
		return(
			<div>
				{store.getState().view === 'TripManager'
				? <TestTripManager />
				: <TestTripDashboard />}
			</div>
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Dashboard />
	</Provider>
	, document.getElementById('app'));
