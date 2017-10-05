import React from 'react';
import Popup from 'react-popup';
import TripPopup from './tripPopup.jsx';
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

    this.togglePopup = this.togglePopup.bind(this);
	}

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

	componentDidMount () {
		this.fetchLists();
	}

	fetchLists() {
		let options = { userId: this.props.user.id };
		$.ajax({
			url: SERVER_URL + '/fetchtrips',
			data: options,
			success: function(res) {
				console.log('Fetched stuff', res);
			}
		});
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
        <ul>
          <a>trip 1</a>
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
