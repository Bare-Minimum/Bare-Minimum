import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';
import { createStore } from 'redux';
import reducer from '../../Reducers';

class TripPopup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTripDashboard = this.createTripDashboard.bind(this);


  }

  createTripDashboard() {
    store.dispatch(reducer.changeView('TripDashboard'));
  }

  handleSubmit(e) {

    
    let option = {
      name: e.target.name.value,
      location: e.target.location.value,
      start: e.target.start.value,
      end: e.target.end.value
    }
    console.log(option);
    // {tripName: "qweer", location: "tryuii", start: "0001-11-11", end: "0444-04-04"}

    e.preventDefault();

    $.ajax({
      url: 'http://127.0.0.1:3000/popup',
      method: 'POST',
      data: option,
      success: (body) => {
        console.log('POST was a success ', body);
      },
      error: (err) => {
        //window.alert('Error: ' + err.responseText);
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

export default TripPopup;


/*

<button onClick={this.props.closePopup}>create trip</button>


   
              


                  
            
*/            








