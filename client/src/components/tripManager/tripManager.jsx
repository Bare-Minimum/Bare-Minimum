import React from 'react';
import Popup from 'react-popup';
import TripPopup from './tripPopup.jsx';
import TripDashboard from '../tripDashboard/tripDashboard.jsx';


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      showPopup: false
    };

    this.togglePopup = this.togglePopup.bind(this);
	}

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
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

export default Dashboard;
