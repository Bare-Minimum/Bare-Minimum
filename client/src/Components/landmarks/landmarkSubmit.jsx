import React from 'react';
import $ from 'jquery';
const SERVER_URL = HOSTNAME;
import { Button } from 'react-bootstrap';

class LandmarkSubmit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      description: '',
      address: '',
      url: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}
  handleChange(e, field) {
  	if (field === 'description') {
       this.setState({description: e.target.value})
     } else if (field === 'address') {
       this.setState({address: e.target.value})
     } else if (field === 'url') {
     	 this.setState({url: e.target.value})
     }
  }

  submit() {
  	let landmark = {
      url: this.state.url,
      description: this.state.description,
      address: this.state.address,
      user: this.props.user.email,
      tripId: this.props.trip.id
  	}
      let context = this;
    $.ajax({
      url: SERVER_URL + '/landmarks',
      method: 'POST',
      data: landmark,
      success: function(body) {
        context.props.fetch();
      },
      error: function(err) {
        window.alert('Error: ' + err.responseText);
      }
    })
    this.setState({
      description: '',
      address: '',
      url: ''
    });
  }

  render() {
		return (
			<div>
        <div className="form-entry">
	        <label className="Landmarks">Description</label>
	        <input className="field" value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} type="text"></input>
        </div>

        <div className="form-entry">
	        <label className="Landmarks">Address</label>
	        <input className="field" value={this.state.address} onChange={(e) => this.handleChange(e, 'address')} type="text"></input>
        </div>

        <div className="form-entry">
	        <label className="Landmarks">URL</label>
	        <input className="field" value={this.state.url} onChange={(e) => this.handleChange(e, 'url')} type="text"></input>
        </div>

        <div className="form-entry">
	        <Button onClick={this.submit}>Submit</Button>
        </div>
			</div>
	  )
  }
};

export default LandmarkSubmit;
