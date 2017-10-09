import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Button } from 'react-bootstrap';

const SERVER_URL = HOSTNAME;

class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itinerary: '',
      phone: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitInfoUpdate = this.submitInfoUpdate.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    let key = e.target.className;
    let state = {};
    state[key] = value;

    this.setState(state);
  }

  submitInfoUpdate() {
    let options = {
      url: `${HOSTNAME}/userinfo/${this.props.user.id}/${this.props.trip}/${this.state.itinerary}/${this.state.phone}`,
      method: 'PATCH'
    }

    $.ajax(options)
    .then(() => {
    })
    .fail((err) => {
      console.error('update error', err);
    });

    this.state.itinerary = '';
    this.state.phone = '';

    this.refs.phone.value = '';
    this.refs.itinerary.value = '';
  }

  render() {
    return (
      <div className="user-details">
        <h3>User info:</h3>
        <form className="form-entry">
          <label><h3>Phone:&nbsp;&nbsp;</h3></label>
          <input type="text" className="phone" onChange={this.handleChange} value={this.state.phone} ref="phone"/>
          <label><h3>&nbsp;&nbsp;Itinerary:&nbsp;&nbsp;</h3></label>
          <input type="text" className="itinerary" value={this.state.itinerary} onChange={this.handleChange} ref="itinerary"/>
          <Button onClick={this.submitInfoUpdate}>Submit</Button>
        </form>
      </div>
    )
  }
}

export default ProfileEditor;
