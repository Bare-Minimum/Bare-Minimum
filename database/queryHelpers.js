const db = require('./index.js');


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

// returns User name and id for all users on trip
const findUsersOnTrip = function(tripId) {
  // db.query(`SELECT users.name, usertrips.tripId FROM usertrips, users WHERE users.id = usertrips.UserId AND usertrips.tripId = ${tripId}`);
  db.query(`SELECT Users.name, Users.id FROM UserTrips, Users WHERE Users.id = UserTrips.UserId AND UserTrips.tripId = ${tripId}`).
  then

  // db.Users.findAll({
  //  include: [
  //    {model: db.UserTrip}
  //  ]
  // })
  // .then((result) => {
  //  console.log(result);
  // })
}

const addSession = function(sessionId, email) {
  console.log('this is db helper ', sessionId, email)

  //this helper function can be used to add foreign keys between users and sessions

}

module.exports = {
  addUser: addUser,
	findUser: findUser,
	addSession: addSession
};
