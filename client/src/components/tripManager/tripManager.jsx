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
			trips: [],
			joinTrip: ''
    };
    console.log('these are props in dashboard constructor', props)

    this.togglePopup = this.togglePopup.bind(this);
    this.joinTrip = this.joinTrip.bind(this);
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

	handleChange(e){
		this.setState({joinTrip:e.target.value})
	}

	joinTrip() {
		let obj = {
      accessCode: this.state.joinTrip,
      userId: this.props.user.id
		};
		let context = this;
    $.ajax({
      url: SERVER_URL + '/jointrip',
      method: 'POST',
      data: obj,
      success: function(body) {
        console.log('POST was a success ', body);
        context.props.fetchLists();
      },
      error: function(err) {
      	console.log(err)
      }
    })
	}

	render() {
		return(
			<div>
			  <br/>
        <button onClick={this.togglePopup}>Create Trip</button>
        <br/>
        <br/>
        <label>Join Trip:</label>
        <br/>
        <input value={this.state.joinTrip} onChange={e => this.handleChange(e)} type="text" name="code" placeholder="add code here"/>
        <input onClick={this.joinTrip} type="submit" value="join"/>
        <br/>
        <br/>
				All your trips!
        <ul>
          {(this.props.trips.map((ele) => {
						return <TripEntry trip={ele} key={ele.id} onClick={() => this.selectTrip(ele)}/>
					}))}
        </ul>
        {this.state.showPopup ?
          <TripPopup
            closePopup={this.togglePopup}
            fetchLists={this.props.fetchLists}
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
