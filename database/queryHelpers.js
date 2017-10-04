const db = require('./index.js');
const Sequelize = require('sequelize');


const addUser = function(user, callback) {
  db.Users.create(user)
  .then(() => {
    callback();
  })
  .catch((err) => {
    console.error('there was an error on user database insert ', err.message);
    callback(err);
  }).catch((err) => {
    console.error('Bad username request! Name may be taken.');
  });
};

const findUser = function(user, callback) {
  db.Users.findAll({where: {name: user.name}})
  .then((foundUser) => {
    callback(foundUser);
  }).catch((err) => {
    console.error('There was an error in user lookup', err);
  });
}

const findUsersOnTrip = function(tripId, callback) {
  console.log('Finding users');

  // query equivalent to:
  // `SELECT Users.name, Users.id FROM UserTrips, Users WHERE Users.id = UserTrips.UserId AND UserTrips.tripId = ${tripId}`
  db.Users.findAll({
    include: [{
      model: db.Trips,
      where: { id: tripId }
    }]
  })
  .then((result) => {
    console.log('Users found: ', result);
    callback(result);
  })
  .catch((err) => {
    console.error('There was an error looking up users on trip', err);
    callback(err);
  });
}


const addSession = function(sessionId, email) {
  console.log('this is db helper ', sessionId, email)
}
  //this helper function can be used to add foreign keys between users and sessions


const createTrip = function(name, location, start, end, lodging, callback) {
	db.Trips.create({
		name: name, 
		location: location, 
		start: start, 
		end: end, 
		lodging: lodging, 
		accessCode: name, 
		isopen: true
	}) 
	.then(() => {
		callback();
	}).catch((err) => {
		console.error('Trip name already exist please try a new name. ', err);
	});

}

module.exports = {
  addUser: addUser,
	findUser: findUser,
	addSession: addSession,
  findUsersOnTrip: findUsersOnTrip,
	createTrip: createTrip

};
