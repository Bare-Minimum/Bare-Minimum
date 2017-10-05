// TODO: Break components into separate files

import React from 'react';
import { connect } from 'react-redux';
import Mapbox from '../mapboxViewer.jsx';
import dummyData from './dummyData.js';
import $ from 'jquery';

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
    console.log('props: ', props);
    console.log(props.user);
  }

  getUsers() {
    let options = {
      url: HOSTNAME,
      success: (data) => {
        console.log('successful GET - Userlist', data);
      },
      error: (data) => {
        console.log('FAILED GET - Userlist', data);
      }
    }

    $.ajax(options);
  }

  toggleMap() {
    console.log(this.state);
    this.setState({
      map: !this.state.map
    }, () => {
      console.log(this.state.map);
    });
  }
  // add button to switch between map view and list view
  // add conditional locationDisplay var to render either map or landmarks
  // toggle not implemented yet!
  render() {

    return(
      <div>  
        <p>Trip Dashboard</p>
        <TripDetails trip={this.props.trip}/>
        <div style={{width: '400px', height: '300px'}}> <Mapbox location={this.props.trip.location}/> </div>
        <ToggleMapButton toggle={this.toggleMap}/>
        <TripUserList users={dummyData.users}/>
        <TripNavBar features={dummyData.features}/>
      </div>
    )
  }
}

// export default TripDashboard;


const TripDetails = (props) => {
  return (
    <div id="trip-details">
      <h4>{props.trip.name}</h4>
      <ul>
        <li>{props.trip.location}</li>
        <li>{props.trip.startDate} - {props.trip.endDate}</li>
        <li>{props.trip.lodging}</li>
      </ul>
    </div>
  )
};

const TripUserList = (props) => {
  let userEntries = props.users.map((user, index) => {
    return <TripUserEntry user={user} key={index} />
  });

  return (
    <div id="trip-user-list">
      <h4>Users on this trip</h4>
      <ul className="user">
        {userEntries}
      </ul>
    </div>
  )
};

// each user should link to profile page
// single user passed as prop
const TripUserEntry = (props) => {
  return <li className="trip-user-entry">{props.user.name}</li>
};

// nav items themselves should be constant across all trips
// currently dynamically loading for flexibility
const TripNavBar = (props) => {
  let featureEntries = props.features.map((feature, index) => {
    return <TripNavLink navItem={feature} key={index} />
  });

  return (
    <div id="trip-nav">
      <h4>Navigation</h4>
      {featureEntries}
    </div>
  )
};

// nav links may be unique depending on how trips are handled
const TripNavLink = (props) => {
  return <div className="trip-nav-link">{props.navItem.name}</div>
};

const ToggleMapButton = (props) => {
  return <button className="toggle-map-button" onClick={props.toggle}>Toggle Map/List View</button>
};



export default connect(mapStateToProps)(TripDashboard);