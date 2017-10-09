import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/homepage/Login.jsx';
import Signup from './components/homepage/Signup.jsx';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import '../dist/style.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

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
        <ul className="navbar">
          <li id="title">The Travel App</li>
          <li className="link">Home</li>
          <li className="link">News</li>
          <li className="link">Contact</li>
        </ul>
        <Row>
          <Signup />
        </Row>
        <Row>
          <Login />
        </Row>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
