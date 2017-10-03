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
TEST COMPONENT APP VIEWS
Replace with final components in Dashboard component
*/

const TestTripManager = (props) => {
	function handleClick(selectedTrip) {
		// props.onSelectView();
		store.dispatch(reducer.changeView('TripDashboard'));

		store.dispatch(reducer.changeTrip(selectedTrip));
	}
	return (
		<div>
			<h1>Trip Manager</h1>
			Test Trip Manager Won't Approve Raises<br />
			<button onClick={() => handleClick('Mexico City 2025')}>Mexico City</button>
			<button onClick={() => handleClick('Helsinki 1984')}>Helsinki</button>
			<button onClick={() => handleClick('Mumbai 2056')}>Mumbai</button>
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
END TEST COMPONENT APP VIEWS
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

//Couldn't get this to work yet.
// 	const mapStateToProps = (state, ownProps) => {
// 		return { props: state.view };
// 	};
//
//
// const AppCountainer = connect(mapStateToProps)(Dashboard);
// export default AppCountainer;
