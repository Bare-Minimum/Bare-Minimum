const mysql = require('mysql');
const request = require('request');
const httpMocks = require('node-mocks-http');
const server = require('../server/index.js');
const expect = require('chai').expect;

describe('Server HTTP requests', function () {
  it ('should return index when a GET request is made to root directory of server', function(done) {

    let options = {
      'method': 'GET',
      'uri': 'http://127.0.0.1:3000/'
    }
    request(options, function (err, res, body) {
      
      console.log('this is back from request', body);
      expect(res.statusCode).to.equal(200);
      done();
    })
  })
})