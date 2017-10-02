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


    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(event, field) {
    if (field === 'Signup') {
      this.setState({userSignup: event.target.value})
    } else if (field === 'Login') {
      this.setState({userLogin: event.target.value})
    }
  }

  handleSubmit(field) {
    let user = {
      name: this.state['user' + field]
    }

    $.ajax({
      url: 'http://127.0.0.1:3000/' + field.toLowerCase(),
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
    if (field === 'Login') {
      this.setState({userLogin: ''});
    } else if (field === 'Signup') {
      this.setState({userSignup: ''});
    }
  }

  render() {
    return (
      <div>
        <p>hello world from travel app component</p>
        <label>sign up for username </label>
        <input type="text" value={this.state.userSignup}
          onChange={(e) => this.handleChange(e, 'Signup')}></input>
        <button onClick={() => this.handleSubmit('Signup')}>submit</button>
        <br></br>
        <br></br>
        <label>log in with username </label>
        <input type="text" value={this.state.userLogin}
          onChange={(e) => this.handleChange(e, 'Login')} placeholder="Login name"></input>
        <button onClick={() => this.handleSubmit('Login')}>submit</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
