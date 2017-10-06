import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';
import { connect } from 'react-redux';
import reducer from '../../Reducers';
import TripDashboard from '../tripDashboard/tripDashboard.jsx';


class TripPopup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTripDashboard = this.createTripDashboard.bind(this);


  }

  createTripDashboard(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  handleSubmit(e) {
    let option = {
      name: e.target.name.value,
      location: e.target.location.value,
      lodging: e.target.lodging.value,
      startDate: e.target.start.value,
      endDate: e.target.end.value,
      userId: this.props.user.id,
      accessCode: e.target.name.value,
      isopen: true
    }

    e.preventDefault();
    let context = this;
    $.ajax({
      url: 'http://127.0.0.1:3000/popup',
      method: 'POST',
      data: option,
      success: (body) => {
        context.props.fetchLists();
        this.createTripDashboard(option);
        console.log('POST was a success ');
      },
      error: (err) => {
        console.log('error with GET', err);
      }
    })
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h3>Create a new trip:</h3>
          <form className="popupform" onSubmit={this.handleSubmit}>
            <div>
              <label>Trip Name:</label>
              <input className="popupfield" type="text" name="name" placeholder="add name..."/>
            </div>
            <br/>
            <div>
              <label>Trip Location:</label>
              <input className="popupfield" type="text" name="location" placeholder="add Location..."/>
            </div>
            <br/>
            <div>
              <label>Trip Lodging:</label>
              <input className="popupfield" type="text" name="lodging" placeholder="add Lodging..."/>
            </div>
            <br/>
            <label>Start Date:</label>
            <br/>
            <input className="popupfield" type="date" name="start" placeholder="start date..."/>
            <br/>
            <br/>
            <label>End Date:</label>
            <br/>
            <input className="popupfield" type="date" name="end" placeholder="end date..."/>
            <br/>
            <br/>
            <input className="popupbutton" type="submit" value="create trip" />
          </form>
        </div>
      </div>
    );
  }
}

let mapStateToProps = ({ user }) => {
  return { user };
}

export default connect(mapStateToProps)(TripPopup);
