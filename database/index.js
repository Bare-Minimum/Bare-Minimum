const mysql = require('mysql');
const Sequelize = require('sequelize');


//Move login/password to SQL to ENV file in root of project
const db = new Sequelize('travelapp', 'student', 'student', {
  dialect: 'mysql'
});

//---------SCHEMA DEFINITIONS--------------------

const Users = db.define('Users', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING
});

const UserTrip = db.define('UserTrip', {
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
  isopen: Sequelize.BOOLEAN
});

const Votes = db.define('Votes', {
  //landmark voting ID
  //user ID (of voter)
});

const Landmarks = db.define('Landmarks', {
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


//----------SIMPLE RUDIMENTARY TEST--- REMOVE ONCE DATABASE TESTS IMPLEMENTED
// Users.sync()
//   .then(function() {
//     // Now instantiate an object and save it:
//     return Users.create({name: 'Jean Valjean', email:'test@gmail.com', password:'abc123', salt:'123456'});
//   })
//   .then(function() {
//     // Retrieve objects from the database:
//     return Users.findAll({ where: {name: 'Jean Valjean'} });
//   })
//   .then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.name + ' exists');
//     });
//     db.close();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     db.close();
//   });


//--------------------FOREIGN KEY SETTINGS -----------------
Users.hasMany(UserTrip);
UserTrip.belongsTo(Users);

Trips.hasMany(UserTrip);
UserTrip.belongsTo(Trips);

Users.hasMany(Votes);
Votes.belongsTo(Users);

Landmarks.hasMany(Votes);
Votes.belongsTo(Landmarks);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Trips.hasMany(Expenses);
Expenses.belongsTo(Trips)



//---------SEQUELIZE REQUIRES SYNC ON ALL TABLES------------
Users.sync();
UserTrip.sync();
Trips.sync();
Votes.sync();
Landmarks.sync();
Expenses.sync();




module.exports = {
  db: db,
  Users: Users,
  UserTrip: UserTrip,
  Trips: Trips,
  Votes: Votes,
  Landmarks: Landmarks,
  Expenses: Expenses
}