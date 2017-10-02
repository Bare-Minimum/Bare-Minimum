import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	userSignup: ''
    };


    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(event) {
  	this.setState({userSignup: event.target.value})
  }

  signup() {

  	let dataObj = {
  		user: this.state.userSignup
  	}
    $.ajax({
      url: 'http://127.0.0.1:3000/signup',
      method: 'POST',
      data: dataObj,
      success: function(body) {
        console.log('POST was a success ', body);
      },
      error: function(err) {
      	console.log('error with POST', err)
      }
    })
  }

  render() {
    return (
      <div>
        <p>hello world from travel app component</p>
        <label>sign up for username </label>
        <input type="text" value={this.state.userSignup} onChange={this.handleChange}></input>
        <button onClick={() => this.signup()}>submit</button>
        <br></br>
        <br></br>
        <label>log in with username </label>
        <input></input>
        <button>submit</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));