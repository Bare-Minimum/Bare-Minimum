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

  createTripDashboard() {
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  handleSubmit(e) {
    let option = {
      name: e.target.name.value,
      location: e.target.location.value,
      lodging: e.target.lodging.value,
      startDate: e.target.start.value,
      endDate: e.target.end.value,
      userId: 1, //insert props.user.id here
      accessCode: e.target.name.value,
      isopen: true
    }

    e.preventDefault();

    $.ajax({
      url: 'http://127.0.0.1:3000/popup',
      method: 'POST',
      data: option,
      success: (body) => {
        this.createTripDashboard();
        console.log('POST was a success ', body);
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
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Trip Name:</p>
              <input type="text" name="name" placeholder="add name..."/>
              <p>Trip Location:</p>
              <input type="text" name="location" placeholder="add Location..."/>
              <p>Trip Lodging:</p>
              <input type="text" name="lodging" placeholder="add Lodging..."/>
              <p>Dates:</p>
              <input type="date" name="start" placeholder="start date..."/>
              <input type="date" name="end" placeholder="end date..."/>
            </label>
            <input type="submit" value="create trip" />
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
         








