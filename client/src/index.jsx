import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	userSignup: '',
      userLogin: ''
    };


    this.handleSignupChange = this.handleSignupChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleSignupChange(event) {
  	this.setState({userSignup: event.target.value})
  }

  handleLoginChange(event) {
    this.setState({userLogin: event.target.value});
  }

  signup() {

  	let user = {
  		name: this.state.userSignup
  	}

    $.ajax({
      url: 'http://127.0.0.1:3000/signup',
      method: 'POST',
      data: user,
      success: function(body) {
        console.log('POST was a success ', body);
      },
      error: function(err) {
      	console.log('error with POST', err)
      }
    })

    this.setState({userSignup: ''});
  }

  login() {
    let user = {
      name: this.state.userLogin
    }

    $.ajax({
      url: 'http://127.0.0.1:3000/login',
      method: 'POST',
      data: user,
      success: function(body) {
        console.log('GET was a success ', body);
      },
      error: function(err) {
        window.alert('Error: ' + err.responseText);
      	console.log('error with GET', err);
      }
    })

    this.setState({userLogin: ''});
  }

  render() {
    return (
      <div>
        <p>hello world from travel app component</p>
        <label>sign up for username </label>
        <input type="text" value={this.state.userSignup} onChange={this.handleSignupChange}></input>
        <button onClick={() => this.signup()}>submit</button>
        <br></br>
        <br></br>
        <label>log in with username </label>
        <input type="text" value={this.state.userLogin} onChange={this.handleLoginChange} placeholder="Login name"></input>
        <button onClick={() => this.login()}>submit</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
