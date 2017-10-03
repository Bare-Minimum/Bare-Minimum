import React from 'react';
import Popup from 'react-popup';


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
    this.handleTripCreation = this.handleTripCreation.bind(this);
	}

  handleTripCreation() {
    
    Popup.create({
    title: null,
    content: 'Hello, look at me',
    className: 'alert',
    buttons: {
        right: ['ok']
    }
});
  }

	render() {
		return(
			<div>  
        <button onClick={this.handleTripCreation}>Create Trip</button>
        <br/>
        <form>
          <p>Join Trip:</p>
          <input type="text" name="code" placeholder="add code here"/>
          <input type="submit" value="join"/>
        </form>
        <ul>
          <a>trip 1</a>
        </ul>
      </div>

		)
	}
}

export default Dashboard;
