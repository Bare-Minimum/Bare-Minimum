require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
//const db = require('../database/index.js');
const app = express();
const query = require('../database/queryHelpers.js');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));


//GET Handler


//POST Handler
app.post('/signup', (req, res) => {
  console.log(req.body);
  query.addUser(req.body, () => {
    res.status(201).send('user submitted to DB');
  });
});

app.post('/login', (req, res) => {
  console.log(req.body.name);
  query.findUser(req.body, (result) => {
    if (result.length !== 0) {
      // TODO: Handle cookies, sessions
      console.log('User found, log in');
      res.status(200).send('Log in matches!');
    } else {
      res.status(404).send('Bad user!');
    }
  });
});


app.listen(process.env.PORT, () => {
  console.log('listening to port ', process.env.PORT);
});

module.exports.app = app;
