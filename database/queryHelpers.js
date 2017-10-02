const db = require('./index.js');


const addUser = function(user, callback) {
	db.Users.create(user)
	.then(() => {
    callback()
	})
	.catch((err) =>
    console.log('there was an error on user database insert ', err)
    //here is where callback should go if user name has been taken
	)
}

module.exports = {
	addUser: addUser
}

