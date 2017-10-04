const environment = process.env.NODE_ENV;
const envPath = '.env.' + environment;
const envVars = require('dotenv').config({path: envPath});

console.log('Current database environment: ', environment);


const mysql = require('mysql');
const Sequelize = require('sequelize');

let dbOptions = {
  dialect: 'mysql',
  logging: false
};

if (process.env.DB_HOST) {
  console.log('setting deployment host');
  dbOptions.host = process.env.DB_HOST;
}

if (process.env.DB_PORT) {
  console.log('setting deployment port');
  dbOptions.port = Number(process.env.DB_PORT);
}

console.log('OPTIONS: ', dbOptions);

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, dbOptions);

//---------SCHEMA DEFINITIONS--------------------

const Users = db.define('Users', {
  name: {type: Sequelize.STRING, unique: true},
  email: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  sessionId: Sequelize.STRING
});

const UserTrip = db.define('UserTrip', {
  flightItinerary: Sequelize.TEXT,
  phone: Sequelize.STRING,
  TripId: Sequelize.INTEGER,
  UserId: Sequelize.INTEGER

});

const Trips = db.define('Trips', {
  name: {type: Sequelize.STRING, unique: true},
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

const Sessions = db.define('Sessions', {
  sid: {type: Sequelize.STRING, primaryKey: true},
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
  UserId: Sequelize.INTEGER
});

//---------SEQUELIZE REQUIRES SYNC ON ALL TABLES------------
Users.sync();
UserTrip.sync();
Trips.sync();
Votes.sync();
Landmarks.sync();
Expenses.sync();
Sessions.sync();

//--------------------FOREIGN KEY SETTINGS -----------------

Users.belongsToMany(Trips, {through: 'UserTrip'});
Trips.belongsToMany(Users, {through: 'UserTrip'});

Users.hasMany(Votes);
Votes.belongsTo(Users);

Landmarks.hasMany(Votes);
Votes.belongsTo(Landmarks);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Trips.hasMany(Expenses);
Expenses.belongsTo(Trips);

Users.hasOne(Sessions, {foreignKey: 'userId'});
Sessions.hasOne(Users, {foreignKey: 'sessionId'});



module.exports = {
  db: db,
  Users: Users,
  UserTrip: UserTrip,
  Trips: Trips,
  Votes: Votes,
  Landmarks: Landmarks,
  Expenses: Expenses,
  Sessions: Sessions
}