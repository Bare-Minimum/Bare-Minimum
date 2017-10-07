import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';
import { connect } from 'react-redux';
import reducer from '../../Reducers';
import TripDashboard from '../tripDashboard/tripDashboard.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


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
        option.id = body.id;
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
      <Row className="popup">
        <Col md={4} mdOffset={4} className="popup_inner">
          <h3>Create a new trip:</h3>
          <form className="popupform" onSubmit={this.handleSubmit}>
            <div className="form-entry">
              <label>Trip Name:</label>
              <input className="popupfield" type="text" name="name" placeholder="add name..."/>
            </div>

            <div className="form-entry">
              <label>Trip Location:</label>
              <input className="popupfield" type="text" name="location" placeholder="add Location..."/>
            </div>

            <div className="form-entry">
              <label>Trip Lodging:</label>
              <input className="popupfield" type="text" name="lodging" placeholder="add Lodging..."/>
            </div>

            <div className="form-entry">
              <label>Start Date:</label>
              <input className="popupfield" type="date" name="start" placeholder="start date..."/>
            </div>

            <div className="form-entry">
              <label>End Date:</label>
                <input className="popupfield" type="date" name="end" placeholder="end date..."/>
            </div>

            <Button className="popupbutton" type="submit" value="create trip">Submit</Button>
          </form>
        </Col>
      </Row>
    );
  }
}

let mapStateToProps = ({ user }) => {
  return { user };
}

export default connect(mapStateToProps)(TripPopup);
