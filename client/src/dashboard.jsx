import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<p>we are on dashboard via React</p>
		)
	}
}

ReactDOM.render(<Dashboard />, document.getElementById('app'));
