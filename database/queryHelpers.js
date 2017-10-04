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

const addSession = function(sessionId, email) {
  console.log('this is db helper ', sessionId, email)

}

module.exports = {
  addUser: addUser,
	findUser: findUser,
	addSession: addSession
};
