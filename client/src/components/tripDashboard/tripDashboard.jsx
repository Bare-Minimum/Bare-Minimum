// TODO: Break components into separate files

import React from 'react';
import { connect } from 'react-redux';
import Mapbox from '../mapboxViewer.jsx';
import Landmarks from '../landmarks/landmarks.jsx';
import UserProfile from './userProfile.jsx';
import reducer from '../../Reducers';
import dummyData from './dummyData.js';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

// allow component to access trip from Redux store
let mapStateToProps = ({ trip }) => {
  return { trip };
}

class TripDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: true,
      users: []
    }

    this.toggleMap = this.toggleMap.bind(this);
  }

  // retrieves array of users on trip
  getUsers() {
    let options = {
      url: HOSTNAME + '/tripusers/' + this.props.trip.id,
      success: (data) => {
        this.setState({
          users: data
        });
      },
      error: (data) => {
        console.log('FAILED GET - Userlist', data);
      }
    }

    $.ajax(options);
  }

  toggleMap() {
    this.setState({
      map: !this.state.map
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return(
      <Row>
      <Col md={8} mdOffset={2} className="dashtrip">
        <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
        <TripDetails trip={this.props.trip}/>
        {this.state.map ? <Mapbox location={this.props.trip.location}/> : <Landmarks />}

        {/*<Button className="button" onClick={this.toggleMap}>Toggle center panel (not currently used)</Button>*/}
        <TripUserList users={this.state.users}/>
      </Col>
      </Row>
    )
  }
}

const TripNavBar = (props) => {
  return (
    <ButtonGroup className="tripnav">
      {props.features.map((feature, index) => {
        return <Button key={index} className="btn" onClick={() => {
          props.dispatch(reducer.changeView(feature.link));
        }}>{feature.name}</Button>
      })}
    </ButtonGroup>
  )
};


const TripDetails = (props) => {
  return (
    <div>
      <h2>{props.trip.name}</h2>
      <hr/>
      <ul>
        <li className="tripdata">Where:&nbsp;&nbsp;{props.trip.location}</li>
        <li className="tripdata">Dates:&nbsp;&nbsp;{props.trip.startDate}&nbsp;&nbsp;|&nbsp;&nbsp;{props.trip.endDate}</li>
        <li className="tripdata">Lodging:&nbsp;&nbsp;{props.trip.lodging}</li>
      </ul>
    </div>
  )
};

const TripUserList = (props) => { 

  return (
    <div>
      <hr/>
      <h4>Who is coming:</h4>
      <ul>
        {props.users.map((user, index) => {
          return <li key={index} className="tripdata">{user.name}</li>
        })}
      </ul>
    </div>
  )
};

export default connect(mapStateToProps)(TripDashboard);
