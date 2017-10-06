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

    this.togglePopup = this.togglePopup.bind(this);
    this.joinTrip = this.joinTrip.bind(this);
    this.selectTrip = this.selectTrip.bind(this);
	}

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

	selectTrip(trip){
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
        <button id="createtripbutton" onClick={this.togglePopup}>Create Trip</button>
        <div className="join">
          <h3 className="welcome">Join Trip:&nbsp;&nbsp;&nbsp;</h3>
          <input value={this.state.joinTrip} onChange={e => this.handleChange(e)} type="text" name="code" placeholder="add code here"/>
          <input className="button" onClick={this.joinTrip} type="submit" value="join"/>
        </div>
  			<h3 id="historytitle">Trips History:</h3> 
        <div>
          <table className="historytable">
            <tbody>
              <tr>
                <th> Trip Name </th>
                <th> Trip Location </th>
                <th> Start Date </th>
                <th> End Date </th>
                <th> Access Code </th>
              </tr>
              {(this.props.trips.map((ele) => {
  		    				return <TripEntry trip={ele} key={ele.id} onClick={() => this.selectTrip(ele)}/>
  				    }))}
  					</tbody>
          </table>
        </div>  
        {this.state.showPopup ?
          <TripPopup
            closePopup={this.togglePopup}
            fetchLists={this.props.fetchLists}
            selectTrip={this.selectTrip}
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
