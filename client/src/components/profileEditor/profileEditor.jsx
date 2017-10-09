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
    console.log(state);

    this.setState(state);
  }

  submitInfoUpdate() {
    let options = {
      url: `${HOSTNAME}/userinfo/${this.props.user}/${this.props.trip}/${this.state.itinerary}/${this.state.phone}`,
      method: 'PATCH'
    }

    console.log(options.url);

    $.ajax(options)
    .then(() => {
      console.log('successful update')
    })
    .fail((data) => {
      console.log('update error');
    });
  }

  render() {
    return (
      <div className="user-details">
        <div>Phone: <input type="text" className="phone" onChange={this.handleChange} value={this.state.phone}></input></div>
        <div>Itinerary: <input type="text" className="itinerary" value={this.state.itinerary} onChange={this.handleChange}/></div>
        <Button onClick={this.submitInfoUpdate}>Submit</Button>
      </div>
    )
  }
}

export default ProfileEditor;