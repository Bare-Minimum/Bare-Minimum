require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../database/index.js');
const query = require('../database/queryHelpers.js');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));

//creates a session and cookie
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: new SequelizeStore({
  	db: db.db,
  	table: 'Sessions'
  })
}));


//GET Handler

app.get('/test', (req, res) => {
  console.log('this is sessionID ', req.session)
  req.session.save((err) => {
    if (err) {
    	console.log('there was error on saving session ', err);
    } else {
    	let week = 3600000 * 24 * 7;
      res.cookie.maxAge = week;
      res.status(200).send(req.session.cookie);
    }
  })
  res.status(200).send();
})

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
