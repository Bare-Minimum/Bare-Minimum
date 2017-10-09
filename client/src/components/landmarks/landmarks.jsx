import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import { createStore } from 'redux';
import reducer from '../../Reducers';
import { connect } from 'react-redux';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';
import LandmarkEntry from './landmarkEntry.jsx';
import LandmarksList from './LandmarksList';

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

/*
Child components for Landmarks view =======================================================
*/

class LandmarkSubmit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      description: '',
      address: '',
      url: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}
  handleChange(e, field) {
  	if (field === 'description') {
       this.setState({description: e.target.value})
     } else if (field === 'address') {
       this.setState({address: e.target.value})
     } else if (field === 'url') {
     	 this.setState({url: e.target.value})
     }
  }

  submit() {
  	let landmark = {
      url: this.state.url,
      description: this.state.description,
      address: this.state.address,
      user: this.props.user.email,
      tripId: this.props.trip.id
  	}
      let context = this;
    $.ajax({
      url: SERVER_URL + '/landmarks',
      method: 'POST',
      data: landmark,
      success: function(body) {
        context.props.fetch();
      },
      error: function(err) {
        window.alert('Error: ' + err.responseText);
      }
    })
    this.setState({
      description: '',
      address: '',
      url: ''
    });
  }

  render() {
		return (
			<div>
        <div class="form-entry">
	        <label class="Landmarks">Description</label>
	        <input class="field" value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} type="text"></input>
        </div>

        <div class="form-entry">
	        <label class="Landmarks">Address</label>
	        <input class="field" value={this.state.address} onChange={(e) => this.handleChange(e, 'address')} type="text"></input>
        </div>

        <div class="form-entry">
	        <label class="Landmarks">URL</label>
	        <input class="field" value={this.state.url} onChange={(e) => this.handleChange(e, 'url')} type="text"></input>
        </div>

        <div class="form-entry">
	        <Button onClick={this.submit}>Submit</Button>
        </div>
			</div>
	  )
  }
};

let mapStateToProps = ({ user, trip }) => {
  return ({ user, trip })
};

export default connect(mapStateToProps)(Landmarks);
