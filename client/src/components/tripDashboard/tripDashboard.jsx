import React from 'react';

// const Trips = db.define('Trips', {
//   name: {type: Sequelize.STRING, unique: true},
//   location: Sequelize.STRING,
//   startDate: Sequelize.DATE,
//   endDate: Sequelize.DATE,
//   lodging: Sequelize.TEXT,
//   accessCode: Sequelize.STRING,
//   isopen: Sequelize.BOOLEAN
// });

// assume one trip row (obj) is being passed in

const trip = {
	name: 'Amsterdames Spring Break',
	location: 'Amsterdam',
	startDate: (new Date("2018-03-20")).toString(),
	endDate: (new Date("2018-03-30")).toString(),
	lodging: 'Hotel Cardboard Box'
};

const users = [
	{
		name: 'Death',
		email: 'deadnotsleeping@gmail.com'
	},
	{
		name: 'Pestilence',
		email: 'admin@angularjs.com'
	},
	{
		name: 'War',
		email: 'fitemeirl@hotmail.com'
	},
	{
		name: 'Famine',
		email: '2hungry4u@yahoo.com'
	}
];

class TripDashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>  
        <p>Trip Dashboard</p>
        <TripDetails trip={trip}/>
        <TripUserList users={users}/>
        <TripNavBar />
        <TripNavLink />
      </div>
		)
	}
}

export default TripDashboard;


const TripDetails = (props) => {
	return (
		<div id="trip-details">
			<h4>{props.trip.name}</h4>
			<ul>
				<li>{props.trip.location}</li>
				<li>{props.trip.startDate} - {props.trip.endDate}</li>
				<li>{props.trip.lodging}</li>
			</ul>
		</div>
	)
};

const TripUserList = (props) => {
	let userEntries = props.users.map((user, index) => {
		return <TripUserEntry user={user} key={index} />
	});

	return (
		<div id="trip-user-list">
			<h4>Users on this trip</h4>
			<ul className="user">
				{userEntries}
			</ul>
		</div>
	)
};

// each user should link to profile page
// single user passed as prop
const TripUserEntry = (props) => {
	return <li className="trip-user-entry">{props.user.name}</li>
};

// nav items themselves should be constant across all trips
const TripNavBar = (props) => {
	return <div id="trip-nav">Nav Bar</div>
};

// nav links may be unique depending on how trips are handled
const TripNavLink = (props) => {
	return <div className="trip-nav-link">Link to Feature</div>
};
