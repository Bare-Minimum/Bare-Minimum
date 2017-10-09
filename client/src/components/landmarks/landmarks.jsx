import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Table } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import reducer from '../../Reducers';
import { connect } from 'react-redux';

import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';
import LandmarksList from './landmarksList.jsx';
import LandmarkSubmit from './landmarkSubmit.jsx';

const SERVER_URL = HOSTNAME;

class Landmarks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			landmarks: []
		}
		this.fetch = this.fetch.bind(this);
	}
	fetch() {
		let context = this;
  	$.ajax({
  		url: SERVER_URL + '/landmarks',
  		method: 'GET',
      data: {
        tripId: this.props.trip.id
      },
  		success: function(body) {
        context.setState({landmarks: body})
  		},
  		error: function(err) {
  			window.alert('Error: ' + err.responseText);
  		}
  	})
  }
	componentWillMount () {
		this.fetch();
	}

	render() {
		return(
      <Row>
  			<Col md={8} mdOffset={2}>
          <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
          <h3> Submit entries for voting! </h3>
  			  <LandmarkSubmit trip={this.props.trip} fetch={this.fetch} user={this.props.user} />
  			  <LandmarksList user={this.props.user} fetch={this.fetch} landmarks={this.state.landmarks} />
  			</Col>
      </Row>
		)
	}
}

let mapStateToProps = ({ user, trip }) => {
  return ({ user, trip })
};

export default connect(mapStateToProps)(Landmarks);
