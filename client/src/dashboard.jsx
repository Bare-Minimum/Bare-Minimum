import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import '../dist/style.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducers';
import { connect } from 'react-redux';

const store = createStore(reducer.travelReducer);
const { getState } = store;

import TripManager from './components/tripManager/tripManager.jsx';
import TripDashboard from './components/tripDashboard/tripDashboard.jsx';
import MapboxViewer from './components/mapboxViewer.jsx';
import ExpenseTracker from './components/expenseTracker/expenseTracker.jsx';
import Landmarks from './components/landmarks/landmarks.jsx'

const SERVER_URL = HOSTNAME;

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		//Listen to changes in the redux store
		store.subscribe(() => {this.setState({reload:false})});
		this.state = {
			trips: []
		};
		this.fetchLists = this.fetchLists.bind(this);
	}
	componentWillMount () {
		//Get login user
		$.get(SERVER_URL + '/loginuser').then((data) => {
			store.dispatch(reducer.changeUser(data[0]));
			this.fetchLists();
    }).catch((err) => {
      console.error('Error getting login user', err);
    });
	}

	fetchLists() {
		let options = { userId: store.getState().user.id };
		let self = this;
		$.ajax({
			url: SERVER_URL + '/fetchtrips',
			data: options,
			success: function(res) {
				self.setState({ trips: res });
			}
		});
	}

	handleLogout () {
		$.post(SERVER_URL + '/logout').then((reply) => {
			location.reload();
		}).catch((err) => {
			console.error('Error!', err);
		});
	};

	getViewComponent () {
		if (store.getState().view === 'TripManager') {
			return <TripManager trips={this.state.trips} fetchLists={this.fetchLists}/>;
		} else if (store.getState().view === 'ExpenseTracker') {
			return <ExpenseTracker />;
		} else if (store.getState().view === 'Landmarks') {
			return <Landmarks />;
		} else {
			return <TripDashboard user={store.getState().user}/>;
		}
	}

	render() {
		return(
			<div>
				<div className="navbar">
          <ul>
            <li id="title">The Travel App</li>
            <li className="link">Home</li>
            <li className="link">News</li>
            <li className="link">Contact</li>
          </ul>
        </div>

        <div className="dashbody">

        	<Row className="manager-main">
        		<Col md={7} mdOffset={2}>
							<h3>Hello {store.getState().user.name}, welcome back</h3>
						</Col>

						<Col md={2}>
							<Button id="logoutbutton" onClick={this.handleLogout}>Logout</Button>
						</Col>
					</Row>

					<button id="hide" onClick={() => store.dispatch(reducer.changeView('TripManager'))}>Trip Manager</button>
					{this.getViewComponent()}
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Dashboard />
	</Provider>
	, document.getElementById('app'));
