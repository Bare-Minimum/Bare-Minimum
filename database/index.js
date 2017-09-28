const mysql = require('mysql');
const Sequelize = require('sequelize');


//Move login/password to SQL to ENV file in root of project
const db = new Sequelize('travelapp', 'student', 'student', {
  dialect: 'mysql'
});

const Users = db.define('Users', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING
});

const UserTripInfo = db.define('UserTripInfo', {
  flightItinerary: Sequelize.TEXT,
  phone: Sequelize.STRING
  //user ID
  //trip ID
});

const Trips = db.define('Trips', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  lodging: Sequelize.TEXT,
  accessCode: Sequelize.STRING,
  isOpen: Sequelize.BOOLEAN
});

const VoteTable = db.define('VoteTable', {
  //landmark voting ID
  //user ID (of voter)
});

const LandmarkVoting = db.define('LandmarkVoting', {
  url: Sequelize.TEXT,
  description: Sequelize.TEXT
  //trip ID
  //user ID (of creator)
});

const Expenses = db.define('Expenses', {
  amount: Sequelize.DOUBLE,
  description: Sequelize.TEXT
  //user payer ID
  //trip ID
});

Users.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return Users.create({name: 'Jean Valjean', email:'test@gmail.com', password:'abc123', salt:'123456'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return Users.findAll({ where: {name: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.name + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });

//----------FOREIGN KEY SETTINGS -------
// Users.hasMany(UserTripInfo);
// UserTripInfo.belongsTo(Users);

// Trips.hasMany(UserTripInfo);
// UserTripInfo.belongsTo(Trips);

// .hasMany()






module.exports = {
  db: db
}