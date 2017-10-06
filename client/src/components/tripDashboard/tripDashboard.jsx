// TODO: Break components into separate files

import React from 'react';
import { connect } from 'react-redux';
import Mapbox from '../mapboxViewer.jsx';
import Landmarks from '../landmarks/landmarks.jsx';
import UserProfile from './userProfile.jsx';
import reducer from '../../Reducers';
import dummyData from './dummyData.js';
import $ from 'jquery';

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
      <div className="dashtrip">
        <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
        <TripDetails trip={this.props.trip}/>
        {this.state.map ? <div style={{width: '400px', height: '300px'}}> <Mapbox location={this.props.trip.location}/> </div> : <Landmarks />}
        <br/>
        <button className="button" onClick={this.toggleMap}>better name?</button>
        <TripUserList users={this.state.users}/>
      </div>
    )
  }
}


const TripNavBar = (props) => {
  return (
    <div className="tripnav">
      {props.features.map((feature, index) => {
        return <button key={index} className="button" onClick={() => {
          props.dispatch(reducer.changeView(feature.link));
        }}>{feature.name}</button>
      })}
    </div>
  )
};


const TripDetails = (props) => {
  return (
    <div>
      <h2>{props.trip.name}</h2>
      <hr/>
      <ul>
        <li className="tripdata">Where:&nbsp;&nbsp;{props.trip.location}</li>
        <li className="tripdata">Dates:&nbsp;&nbsp;{props.trip.startDate}&nbsp;&nbsp;=&nbsp;&nbsp;{props.trip.endDate}</li>
        <li className="tripdata">Lodging:&nbsp;&nbsp;{props.trip.lodging}</li>
      </ul>
    </div>
  )
};

const ToggleMapButton = (props) => {
  return 
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
