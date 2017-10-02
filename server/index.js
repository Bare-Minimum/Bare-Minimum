require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const query = require('../database/queryHelpers.js')
const session = require('express-session')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));

//creates a session and cookie
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))


//GET Handler

//on every single get request, check for session and direct to appropriate page

//on successful login or signup, issue new session




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
