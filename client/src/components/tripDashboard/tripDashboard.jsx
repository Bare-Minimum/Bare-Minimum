// TODO: Break components into separate files

import React from 'react';
import { connect } from 'react-redux';
import Mapbox from '../mapboxViewer.jsx';
import Landmarks from '../landmarks/landmarks.jsx';
import TripNavBar from './tripNavBar.jsx'
import UserInfo from './userInfo.jsx';
import reducer from '../../Reducers';
import dummyData from './dummyData.js';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

// allow component to access trip from Redux store
let mapStateToProps = ({ trip }) => {
  return { trip };
}

class TripDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: true,
      users: [],
      selectedUserInfo: ''
    }

    this.toggleMap = this.toggleMap.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    console.log(props);
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

  // select user to display info
  // on click, set selectedUser to clicked
  showUserInfo(userId) {
    let options = {
      url: `${HOSTNAME}/userinfo/${userId}/${this.props.trip.id}`,
      success: (data) => {
        this.setState({
          selectedUserInfo: data
        });
        console.log(data);
      },
      error: (data) => {
        console.log('FAILED GET - User Info', data);
      }
    }

    $.ajax(options);
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
        <TripUserList users={this.state.users} selectedUser={this.state.selectedUserInfo} showUserInfo={this.showUserInfo}/>
      </Col>
      </Row>
    )
  }
}


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

        {props.users.map((user, index) => {
          return (
            
            <div className="user-entry" key={index} className="tripdata" onClick={() => {props.showUserInfo(user.id)}}>
              <Button bsSize="large"><Glyphicon glyph="user" /> {user.name}</Button> 
              {props.selectedUser.UserId === user.id ? <UserInfo user={props.selectedUser} /> : null}
            </div>
          )
        })}

    </div>
  )
};

export default connect(mapStateToProps)(TripDashboard);
