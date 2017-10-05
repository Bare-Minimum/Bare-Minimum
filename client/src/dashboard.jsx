import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import TripManager from './components/tripManager/tripManager.jsx';
import TripDashboard from './components/tripDashboard/tripDashboard.jsx';
import MapboxViewer from './components/mapboxViewer.jsx';
import Landmarks from './components/landmarks/landmarks.jsx'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducers';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'; 

const store = createStore(reducer.travelReducer);
const { getState } = store;

const SERVER_URL = HOSTNAME;


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		//Listen to changes in the redux store
		store.subscribe(() => {this.setState({reload:false})});
	}
	componentWillMount () {
		//Get login user
		$.get(SERVER_URL + '/loginuser').then((data) => {
      console.log('Success:', data);
			store.dispatch(reducer.changeUser(data));
    }).catch((err) => {
      console.error('Error getting login user', err);
    });
	}

	handleLogout () {
		$.post(SERVER_URL + '/logout').then((reply) => {
			console.log('Logged out');
			location.reload();
		}).catch((err) => {
			console.error('Error!', err);
		});
	};

	render() {
		return(
			<div>
				Logged in as: {store.getState().user}
				<button onClick={this.handleLogout}>Log out</button>
				{store.getState().view === 'TripManager'
				? <TripManager push={push}/>
				: <TripDashboard />}
				? <TestTripManager />
				: <TestTripDashboard />}
				<Landmarks user={store.getState().user}></Landmarks>
			</div>
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Dashboard />
	</Provider>
	, document.getElementById('app'));
