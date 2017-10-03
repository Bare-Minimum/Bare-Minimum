import React from 'react';
import ReactDOM from 'react-dom';
import TripManager from './'

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
			<TripManager/>
			</div>
		)
	}
}

ReactDOM.render(<Dashboard />, document.getElementById('app'));
