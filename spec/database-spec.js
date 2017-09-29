const mysql = require('mysql');
const request = require('request');
const expect = require('chai').expect;

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

  it ('should store new users when query is called', function(done) {
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
