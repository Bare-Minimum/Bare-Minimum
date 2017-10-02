const mysql = require('mysql');
const request = require('request');
const expect = require('chai').expect;
const seq = require('../database/index.js');

console.log('MySQL server will need to be running');

describe('MySQL Database server', function () {
  let dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'travelapp'
    });
    dbConnection.connect();

    done();
  });

  afterEach(function() {
    dbConnection.end();
  });

  it ('should store new User when query is called', function(done) {
    let testUser = {
      name: 'Jean Valjean II',
      email: 'valjean@valsjeans.com',
      password: 'immajean123',
      salt: 'nacl'
    };
    let awfulQuery = `INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES (\'${testUser.name}\', \'${testUser.email}\', \'${testUser.password}\', \'${testUser.salt}\', CURDATE(), CURDATE())`;
    dbConnection.query(awfulQuery, (err, results) => {
      dbConnection.query(`SELECT * FROM Users WHERE name=\'${testUser.name}\'`, (err, results) => {
        expect(results[0].name).to.equal(testUser.name);
        dbConnection.query(`DELETE FROM Users WHERE name=\'${testUser.name}\'`, (err, results) => {
          done();
        });
      });
    });
  });
});

describe('Sequelize Database Tests', function () {
  let testTrip = {
    name: 'Spring Bash 2018',
    location: 'London',
    // startDate: new Date(),
    // endDate: new Date(),
    lodging: 'Hotel info',
    accessCode: '12345',
    isopen: true
  };

  let testUser = {
    name: 'Jean Valjean II',
    email: 'valjean@valsjeans.com',
    password: 'immajean123',
    salt: 'nacl'
  }

  it ('should store new Trip when sequelize insertion method is called', function(done) {
    seq.Trips.sync()
    .then(function() {
      return seq.Trips.create(testTrip);
    })
    .then(function() {
      return seq.Trips.findAll({ where: {accessCode: '12345'} });
    })
    .then(function(trip) {
      expect(trip[0].location).to.equal(testTrip.location);
      return seq.Trips.destroy({where: {accessCode: '12345'} });
    })
    .then(function(destroyed) {
      expect(destroyed).to.equal(1);
      done();
    })
    .catch(function(err) {
      console.error(err);
      seq.db.close();
      done();
    });
  })

  it ('should insert a foreign key and retrieve data based on the key', function(done) {
    //let trip;
    seq.Trips.create(testTrip)
    .then(trip => {
      return seq.Users.create(testUser)
      .then(user => {
        return trip.addUser(user)
        .then(() => {
          return trip.hasUser(user)
          .then((result) => {
            expect(result).to.equal(true);
            return trip.destroy()
            .then(() => {
              return user.destroy()
              .then(() => {
                seq.db.close()
                done();
              })
            })
          })
        })
      })
    })
    .catch(function(err) {
      console.error(err);
      seq.db.close();
      done();
    });
  })

});