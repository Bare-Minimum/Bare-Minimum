import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/homepage/Login.jsx';
import Signup from './components/homepage/Signup.jsx';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import '../dist/style.css';

const serverURL = HOSTNAME;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	userSignup: '',
      userLogin: ''
    };
  }


  render() {
    return (
      <div>
        <div className="navbar">
          <ul>
            <li id="title">The Travel App</li>
            <li className="link">Home</li> 
            <li className="link">News</li> 
            <li className="link">Contact</li> 
          </ul>
        </div>
        <br/>
        <br/>
        <div className="signup">
          <Signup></Signup>
        </div>
        <br/>
        <br/>
        <div className="login">
          <Login></Login>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
