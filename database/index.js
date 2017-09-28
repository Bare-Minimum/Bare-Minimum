const mysql = require('mysql');
const Sequelize = require('sequelize');


//Move login/password to SQL to ENV file in root of project
const db = new Sequelize('travelapp', 'root', 'plantlife', {
  dialect: 'mysql'
});

// const Users = db.define('Users', {
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
//   password: Sequelize.STRING,
//   salt: Sequelize.STRING
// });

// const UserTripInfo = db.define('UserTripInfo', {
//   flightItinerary: Sequelize.TEXT,
//   phone: Sequelize.STRING
//   //user ID
//   //trip ID
// });

// const Trips = db.define('Trips', {
//   name: Sequelize.STRING,
//   location: Sequelize.STRING,
//   startDate: Sequelize.DATE,
//   endDate: Sequelize.DATE,
//   lodging: Sequelize.TEXT,
//   accessCode: Sequelize.STRING,
//   isOpen: Sequelize.BOOLEAN
// });

// const VoteTable = db.define('VoteTable', {
//   //landmark voting ID
//   //user ID (of voter)
// });

// const LandmarkVoting = db.define('LandmarkVoting', {
//   url: Sequelize.TEXT,
//   description: Sequelize.TEXT
//   //trip ID
//   //user ID (of creator)
// });

// const Expenses = db.define('Expenses', {
//   amount: Sequelize.NUMBER,
//   description: Sequelize.TEXT
//   //user payer ID
//   //trip ID
// });



//FOREIGN KEY SETTINGS - leave for someone to figure out: example below
//Users.hasMany(UserTripInfo, {foreignKey: 'userId'});




module.exports = {
  db: db
}