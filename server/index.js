const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('../database/index.js');
const query = require('../database/queryHelpers.js');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, samesite: false },
  store: new SequelizeStore({
  	db: db.db,
  	table: 'Sessions'
  })
}));

//on every single get request, check for session and direct to appropriate page
app.use((req, res, next) => {
  if (req.session.user) {
    console.log('you have a legit cookie!')
    if (req.url === '/') {
      res.redirect('/dashboard');
    }
  	next();
  } else {
  	console.log('you have no cookie')
  	next();
  }
})

app.use(express.static(__dirname + '/../client/dist'));


//creates a session and cookie


//GET Handler
app.get('/dashboard', (req, res) => {
  console.log('Send over the second app');
  // res.status(200);
  // res.redirect('/dashboard.html');
  res.contentType('text/html');
  res.sendFile(path.resolve(__dirname + '/../client/dist/dashboard.html'));

  // res.end('Cool');
});

//on successful login or signup, issue new session




//POST Handler
app.post('/signup', (req, res) => {
  req.session.user = req.body.name;
  query.addUser(req.body, () => {
    res.status(201).send('user submitted to DB');
  });
});


app.post('/login', (req, res) => {
  query.findUser(req.body, (result) => {
    if (result.length !== 0) {
      // TODO: Handle cookies, sessions
      req.session.user = req.body.name;
      console.log('User found, log in');
      // res.status(200).send('Log in matches!');
      res.contentType('text/html').status(200);
      // res.sendFile(path.resolve(__dirname + '/../client/dist/dashboard.html'));
      res.redirect('/dashboard.html');
    } else {
      res.status(404).send('Bad user!');
    }
  });
});


app.listen(process.env.PORT, () => {
  console.log('listening to port ', process.env.PORT);
});

module.exports.app = app;
