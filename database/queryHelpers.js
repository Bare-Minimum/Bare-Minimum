const db = require('./index.js');


const addUser = function(user, callback) {
	db.Users.create(user)
	.then(() => {
	  callback()
	})
	.catch((err) =>
	  console.log('there was an error on user database insert ', err)
	  //here is where callback should go if user name has been taken
	);
};

const findUser = function(user, callback) {
	db.Users.findAll({where: {name: user.name}})
	.then((foundUser) => {
		callback(foundUser);
	}).catch((err) => {
		console.error('There was an error in user lookup', err);
	});
}

module.exports = {
  addUser: addUser,
	findUser: findUser
};
