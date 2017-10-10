const mysql = require('mysql');
const request = require('request');
const httpMocks = require('node-mocks-http');
const server = require('../server/index.js');
const expect = require('chai').expect;
// const SERVER_URL = HOSTNAME;

const tripId = 1;
const userId = 1;

describe('Server HTTP requests', function () {
  it ('should return index when a GET request is made to root directory of server', function(done) {
    let options = {
      'method': 'GET',
      'uri': process.env.HOSTNAME
    }
    request(options, function (err, res, body) {
      console.log('this is back from request', body);
      expect(res.statusCode).to.equal(200);
      done();
    })
  })
})

// make sure these do not access database -- only check response
// user authentication tests
  // POST - account creation should not return ok if user already exists
  // GET - login user
describe('User Authentication', function () {
  it ('should not load dashboard if user is not logged in', function(done) {
    let options = {
      'method': 'GET',
      'uri': `${process.env.HOSTNAME}/dashboard`
    }

    request(options, function (err, res, body) {
      expect(body).to.not.have.string('dashboard');
      done();
    });
  })
})

describe('Trip Manager', function () {
  it ('should return a 200 status code when getting trip list for a user', function(done) {
    let options = {
      'method': 'GET',
      'uri': `${process.env.HOSTNAME}/dashboard/fetchtrips/${userId}`
    }

    request(options, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });


});

  // GET - user list
  // GET - correct trip
describe('Dashboard', function () {
  it ('should return a 200 status code when getting userlist for a trip', function(done) {
    let options = {
      'method': 'GET',
      'uri': `${process.env.HOSTNAME}/dashboard/tripusers/${tripId}`
    }

    request(options, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it ('should return a 200 status code when retrieving trip-specific user info', function(done) {
    let options = {
      'method': 'GET',
      'uri': `${process.env.HOSTNAME}/userinfo/${userId}/${tripId}`
    }

    request(options, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

});

describe('Expenses', function () {
  it ('should return a 200 status code when POSTing an expense', function(done) {
    let options = {
      'method': 'POST',
      'uri': `${process.env.HOSTNAME}/expense`
    }

    request(options, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it ('should return a 200 status code when retrieving an expense', function(done) {
    let options = {
      'method': 'GET',
      'uri': `${process.env.HOSTNAME}/expense`
    }

    request(options, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

// Landmarks return error codes when database can't be accessed--cannot unit test endpoints
// describe('Landmarks', function () {
//   it ('should return a 200 status code when POSTing a landmark', function(done) {
//     let options = {
//       'method': 'POST',
//       'uri': `${process.env.HOSTNAME}/landmarks`
//     }

//     request(options, function (err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });

//   it ('should return a 200 status code when retrieving an expense', function(done) {
//     let options = {
//       'method': 'GET',
//       'uri': `${process.env.HOSTNAME}/landmarks`
//     }

//     request(options, function (err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });
// });

// describe('Landmarks', function () {
//   it ('should return a 200 status code when POSTing an expense', function(done) {
//     let options = {
//       'method': 'GET',
//       'uri': `${SERVER_URL}/expense`
//     }

//     request(options, function (err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });
//   app.post('/expense', (req, res) => {
// })
// LANDMARKS
  // POST - votes, loc, details
  // GET - votes, loc, details

