import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/homepage/Login.jsx';
import Signup from './components/homepage/Signup.jsx';


const serverURL = HOSTNAME;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	userSignup: '',
      userLogin: ''
    };


    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    if (field === 'Signup') {
      this.setState({userSignup: event.target.value})
    } else if (field === 'Login') {
      this.setState({userLogin: event.target.value})
    }
  }

  fetchPage() {
    $.get(serverURL + '/dashboard').then((data) => {


      console.log('Success');
      var htmlString = (new DOMParser()).parseFromString(data,"text/html");
      $('head').empty().append(htmlString.head.outerHTML);
      $('body').empty().append(htmlString.body.outerHTML);
    }).catch((err) => {
      console.error(err);
      window.alert('Error with fetch page! ' + err.responseText);
    });
  }

  // handleSubmit(field) {
  //   let user = {
  //     name: this.state['user' + field]
  //   }
  //   let self = this;
  //   $.ajax({

  //     url: serverURL + '/' + field.toLowerCase(),

  //     method: 'POST',
  //     data: user,
  //     success: function(body) {
  //       console.log('POST was a success ', body);
  //       self.fetchPage();
  //     },
  //     error: function(err) {
  //       window.alert('Error: ' + err.responseText);
  //     	console.log('error with GET', err);
  //     }
  //   })
  //   if (field === 'Login') {
  //     this.setState({userLogin: ''});
  //   } else if (field === 'Signup') {
  //     this.setState({userSignup: ''});
  //   }
  // }

  render() {
    return (
      <div>
        <h2>The Travel App</h2>
        <Login></Login>
        <br></br>
        <br></br>
        <Signup></Signup>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
