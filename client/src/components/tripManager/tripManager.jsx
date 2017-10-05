import React from 'react';
import Popup from 'react-popup';
import TripPopup from './tripPopup.jsx';
import TripEntry from './tripEntry.jsx';
import reducer from '../../Reducers';

import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;



class Dashboard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      showPopup: false,
			trips: []
    };
    console.log('these are props in dashboard constructor', props)

    this.togglePopup = this.togglePopup.bind(this);
	}

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

	selectTrip(trip){
		console.log('Trip selected:', trip.name);
		this.props.dispatch(reducer.changeTrip(trip));
		this.props.dispatch(reducer.changeView('TripDashboard'));
	}

	render() {
		return(
			<div>
        <button onClick={this.togglePopup}>Create Trip</button>
        <br/>
        <form>
          <p>Join Trip:</p>
          <input type="text" name="code" placeholder="add code here"/>
          <input type="submit" value="join"/>
        </form>
				Created Trips
        <ul>
          {(this.props.trips.map((ele) => {

						return <TripEntry trip={ele} key={ele.id} onClick={() => this.selectTrip(ele)}/>
					}))}
        </ul>
        {this.state.showPopup ?
          <TripPopup
            closePopup={this.togglePopup}
          />
          : null
        }
      </div>
		)
	}
}

let mapStateToProps = ({ user }) => {
	return { user };
}

export default connect(mapStateToProps)(Dashboard);
