import React from 'react';
import Mapbox from '../mapboxViewer.jsx';


// assume one trip row (obj) is being passed in
const trip = {
  name: 'Amsterdames Spring Break',
  location: 'Amsterdam',
  startDate: (new Date("2018-03-20")).toString(),
  endDate: (new Date("2018-03-30")).toString(),
  lodging: 'Hotel Cardboard Box'
};

const users = [
  {
    name: 'Death',
    email: 'deadnotsleeping@gmail.com'
  },
  {
    name: 'Pestilence',
    email: 'admin@angularjs.com'
  },
  {
    name: 'War',
    email: 'fitemeirl@hotmail.com'
  },
  {
    name: 'Famine',
    email: '2hungry4u@yahoo.com'
  }
];

// will probably take click handlers instead of links,
// but can refactor
const features = [
  {
    name: 'Expense Calculator',
    link: 'some_link_to_expenses'
  },
  {
    name: 'Destinations',
    link: 'some_link_to_destinations'
  },
  {
    name: 'Calendar',
    link: 'some_link_to_calendar'
  },
  {
    name: 'Photos',
    link: 'some_link_to_photos'
  }
];

class TripDashboard extends React.Component {
  constructor(props) {
    super(props);

    state: {
      map: true
    }

    this.toggleMap = this.toggleMap.bind(this);
    console.log(this.toggleMap);
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


  render() {

    return(
      <div>  
        <p>Trip Dashboard</p>
        <TripDetails trip={trip}/>
        <div style={{width: '400px', height: '300px'}}> <Mapbox location={trip.location}/> </div>
        <ToggleMapButton toggle={this.toggleMap}/>
        <TripUserList users={users}/>
        <TripNavBar features={features}/>
      </div>
    )
  }
}

export default TripDashboard;


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