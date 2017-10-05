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

  db.Users.findAll({
    include: [{
      model: db.Trips,
      where: { id: tripId }
    }]
  })
  .then((result) => {
    console.log('found: ', result[0]);
  })
  .catch((err) => {
    console.error('There was an error looking up users on trip', err);
  });

  // db.query(`SELECT Users.name, Users.id FROM UserTrips, Users WHERE Users.id = UserTrips.UserId AND UserTrips.tripId = ${tripId}`)
  // .then((result) => {
  //   console.log('found: ', result);
  // })
  // .catch((err) => {
  //   console.error('There was an error looking up users on trip');
  // });
}

const addSession = function(sessionId, email) {
  console.log('this is db helper ', sessionId, email)

  //this helper function can be used to add foreign keys between users and sessions

}

module.exports = {
  addUser: addUser,
	findUser: findUser,
	addSession: addSession
  findUsersOnTrip: findUsersOnTrip
};
