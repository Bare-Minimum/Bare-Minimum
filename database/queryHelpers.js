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

const findUserByEmail = function(user, callback) {
  db.Users.findAll({where: {email: user.name}})
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


const createTrip = function(trip, callback) {

	db.Trips.create(trip)
  .then((result) => {
    db.UserTrip.create({
      flightItinerary: 'SFO to BOS',
      phone: 123456789,
      UserId: trip.userId,
      TripId: result.dataValues.id
    })
  })
	.then(() => {
    console.log('Successful trip add');
		callback();
	}).catch((err) => {
		console.error('Trip name already exist please try a new name. ', err);
    callback(err)
	});

}

const addLandmark = function(landmark, callback) {
	db.Users.findOne({where: {email: landmark.user}})
	.then ((user) => {
	  db.Landmarks.create({
			url: landmark.url,
	    description: landmark.description,
	    address: landmark.address,
	    tripId: 1,
	    userId: user.id
	  })
	})
	.then(() => {
		callback();
	})
  .catch((err) => {
  	console.log('there was an error on landmark create', err);
  })
}

const findLandmarks = function(callback) {
  db.Landmarks.findAll({limit: 20})
  .then((landmarks) => {
    callback(landmarks)
  })
  .catch((err) => {
  	console.log('there was an error finding Landmarks ', err);
  })

}

module.exports = {
  addUser: addUser,
	findUser: findUser,
	addSession: addSession,
  findUsersOnTrip: findUsersOnTrip,
	createTrip: createTrip,
	addLandmark: addLandmark,
	findLandmarks: findLandmarks,
  findUsersOnTrip
};
