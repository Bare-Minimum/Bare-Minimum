import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
const SERVER_URL = 'http://127.0.0.1:3000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	userSignup: '',
      userLogin: ''
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    if (field === 'Signup') {
      this.setState({userSignup: event.target.value})
    } else if (field === 'Login') {
      this.setState({userLogin: event.target.value})
    }
  }

  fetchPage() {
    $.get(SERVER_URL + 'dashboard').then((data) => {
      console.log('Success');
      var htmlString = (new DOMParser()).parseFromString(data,"text/html");
      $('head').empty().append(htmlString.head.outerHTML);
      $('body').empty().append(htmlString.body.outerHTML);
    }).catch((err) => {
      console.error(err);
      window.alert('Error with fetch page! ' + err.responseText);
    });
  }

  handleSubmit(field) {
    let user = {
      name: this.state['user' + field]
    }
    let self = this;
    $.ajax({
      url: SERVER_URL + field.toLowerCase(),
      method: 'POST',
      data: user,
      success: function(body) {
        console.log('POST was a success ', body);
        self.fetchPage();
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
