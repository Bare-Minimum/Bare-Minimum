import React from 'react';
import ReactDOM from 'react-dom';
import TripManager from './components/tripManager/tripManager.jsx';
import TripDashboard from './components/tripDashboard/tripDashboard.jsx'

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<TripManager/>
				<TripDashboard/>
			</div>	
		)
	}
}

ReactDOM.render(<Dashboard />, document.getElementById('app'));
