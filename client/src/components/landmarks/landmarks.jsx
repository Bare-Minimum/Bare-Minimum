import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';



import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../Reducers';
const store = createStore(reducer.travelReducer);
const { getState } = store;
import { connect } from 'react-redux';

const SERVER_URL = HOSTNAME;

class Landmarks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			landmarks: []
		}
		//Listen to changes in the redux store
		//store.subscribe(() => {this.setState({reload:false})});
		this.fetch = this.fetch.bind(this);
	}
	fetch() {
		let context = this;
  	$.ajax({
  		url: SERVER_URL + '/landmarks',
  		method: 'GET',
  		success: function(body) {
        context.setState({landmarks: body})
        console.log(context.state.landmarks)
  		},
  		error: function(err) {
  			window.alert('Error: ' + err.responseText);
  		}
  	})
  }
	componentWillMount () {
		this.fetch();
		//console.log(this.state.landmarks)
		//Get login user
		// $.get(SERVER_URL + '/landmarks').then((data) => {
  //     console.log('Success:', data);
		// 	store.dispatch(reducer.changeUser(data));
  //   }).catch((err) => {
  //     console.error('Error getting login user', err);
  //   });
	}

	render() {
		return(
			<div>
        <h2> Submit entries for voting! </h2>
			  <LandmarkSubmit fetch={this.fetch} user={this.props.user}></LandmarkSubmit>
			  <br></br>
			  <br></br>
			  <LandmarksList user={this.props.user} fetch={this.fetch} landmarks={this.state.landmarks}></LandmarksList>
			</div>
		)
	}
}



/*
Child components for Landmarks view =======================================================
*/

class LandmarkSubmit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      description: '',
      address: '',
      url: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);

	}
  handleChange(e, field) {
  	if (field === 'description') {
       this.setState({description: e.target.value})
     } else if (field === 'address') {
       this.setState({address: e.target.value})
     } else if (field === 'url') {
     	 this.setState({url: e.target.value})
     }
  }

  submit() {
  	let landmark = {
      url: this.state.url,
      description: this.state.description,
      address: this.state.address,
      user: this.props.user
  	}
      let context = this;
    $.ajax({
      url: SERVER_URL + '/landmarks',
      method: 'POST',
      data: landmark,
      success: function(body) {
        console.log('POST was a success ', body);
        context.props.fetch();
      },
      error: function(err) {
        window.alert('Error: ' + err.responseText);
      	console.log('error with GET', err);
      }
    })
    this.setState({
      description: '',
      address: '',
      url: ''
    });
  }

  render() {
		return (
			<div>
	        <label>Description</label>
	        <br></br>
	        <input value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} type="text"></input>
	        <br></br>
	        <label>Address</label>
	        <br></br>
	        <input value={this.state.address} onChange={(e) => this.handleChange(e, 'address')} type="text"></input>
	        <br></br>
	        <label>URL</label>
	        <br></br>
	        <input value={this.state.url} onChange={(e) => this.handleChange(e, 'url')} type="text"></input>
	        <button onClick={this.submit}>Submit</button>
			</div>
	  )
  }
};

const LandmarksList = (props) => {
  
	function handleClick() {

  }
  return (
    <div>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th> Description </th>
          <th> URL </th>
          <th> Address </th>
          <th> Suggested by </th>
          <th> Votes </th>
        </tr>
        { props.landmarks.map(landmark => <LandmarkEntry user={props.user} fetch={props.fetch} landmark={landmark} key={landmark.id}/>) }
        
        </tbody>
      </table> 
		</div>
	);
};

const LandmarkEntry = (props) => {
  function handleClick() {
    const context = this;
    let obj = {
      landmarkId: props.landmark.id,
      userId: props.user.id
    };
    console.log('this is a vote', obj);
    $.ajax({
      url: SERVER_URL + '/vote',
      method: 'POST',
      data: obj,
      success: function(body) {
        console.log('POST was a success ', body);
        props.fetch();
      }
    })
	}
	return (
    <tr>
      <td><button onClick={handleClick}>vote</button></td>
      <td>{props.landmark.description}</td>
      <td><a href={props.landmark.url}>{props.landmark.url}</a></td>
      <td>{props.landmark.address}</td>
      <td>{props.landmark.User.name}</td>
      <td># votes</td>
    </tr> 
	);
};

let mapStateToProps = ({ user }) => {
  return ({ user })
}

export default connect(mapStateToProps)(Landmarks)