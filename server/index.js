const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('../database/index.js');
const query = require('../database/queryHelpers.js');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

// Express Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

app.use(passport.initialize());
app.use(passport.session());
passport.use('local-signin', new Strategy({
  usernameField: 'email'
  },
  function(email, password, done) {
    db.Users.findOne({ where: {email: email} })
      .then( (user) => {
        if (!user) { return done(null, false); }
        if (user.dataValues.password !== password) { return done(null, false); }
        return done(null, user.dataValues);
      });
  }
));

//on every single get request, check for session and direct to appropriate page
app.use((req, res, next) => {
  if (req.session.user) {
    if (req.url === '/') {
      res.redirect('/dashboard');
    } else {
      next();
    }
  } else {
    next();
  }
});

//do not serve static files until AFTER cookies have been checked
app.use(express.static(__dirname + '/../client/dist'));

//Routes
app.post('/login', passport.authenticate('local-signin'), function(req, res) {
  req.session.user = req.body.email
  query.addSession(req.session.id, req.body.email)
  res.redirect('/dashboard');
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Couldn\'t destroy session:', err);
      res.status(500).end('You are trapped in this app.');
    } else {
      console.log('Session destroyed');
      //clean the cookie
      res.cookie("connect.sid", "", { expires: new Date() });
      res.redirect('/');
    }
  });
});

app.get('/dashboard', (req, res) => {

  if (req.session.user) {
    res.contentType('text/html');
    res.status(200).sendFile(path.resolve(__dirname + '/../client/dist/dashboard.html'));
  } else {
    res.status(403).redirect('/')
  }
});

app.get('/loginuser', (req, res) => {
  let option = {name: req.session.user};
  query.findUserByEmail(option, (result) => {
    return res.status(200).send(result);
  });
});

app.post('/jointrip', (req, res) => {
  query.joinTrip(req.body, (err) => {
    if (err) {
      res.status(400).end(err);
    } else {
      return res.status(200).end();
    }
  })
})

app.get('/fetchtrips', (req, res) => {
  query.findTripsForUser(req.query.userId, (result) => {
    // console.log('Result of query', result);
    //Array of objects where only the dataValues keys is useful
    let finalResult = result.map((ele) => ele.dataValues);
    // console.log('Trips for user:', finalResult);
    return res.status(200).send(finalResult);
  });
});

//on successful login or signup, issue new session
//create a cookie by assigining req.session.user to something (this occurs both in /signup and /login)
app.post('/signup', (req, res) => {
  query.addUser(req.body, (err) => {
    if (err) {
      res.status(400).send('Bad signup request. Username may be taken.');
    } else {
      req.session.user = req.body.email;
      query.addSession(req.session.id, req.body.email)
      res.redirect('/dashboard');
    }
  });
});

app.post('/vote', (req, res) => {
  db.Votes.create(req.body)
  .then(() => {
    return res.status(200).end();
  })
  .catch((err) => {
    console.log('error in vote insertion', err)
  })

})

app.post('/landmarks', (req, res) => {

  console.log('this is landmarks submission ', req.body);
  query.addLandmark(req.body, (err, result) => {
    if (err) {
      console.log('there was error on landmarks submission ', err);
    }
    res.status(200).send('submission successful');
  })
})

app.get('/landmarks', (req, res) => {
  query.findLandmarks((landmarks) => {
    return res.status(200).send(landmarks);
  })
})


app.post('/expense', (req, res) => {
  query.createExpense(req.body).then((response) => {
    console.log('Got back from DB:', response);
    res.status(200).end();
  }).catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

app.get('/expense', (req, res) => {
  console.log('Got an expense fetch.', req.query);
  query.getExpensesForTrip(req.query.tripId).then((result) => {
    let finalResult = result.map((ele) => ele.dataValues);
    res.status(200).send(finalResult);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// Data Retrieval Endpoints

// GET users on trip
app.get('/tripusers/:tripId', (req, res) => {
  const tripId = req.params.tripId;

  query.findUsersOnTrip(tripId, (results) => {
    return res.send(results);
  });
});

//Helper Functions
passport.serializeUser(function(user, done) {
  console.log('this is from serializing', user)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.Users.findById(id)
  .then( (user) => {
    done(null, user.dataValues);
  });
});

app.post('/popup', (req, res) => {

  query.createTrip(req.body, (err) => {
    if (err) {
      res.status(400).send('Trip name already exist, please try a new name.');
    } else {
      return res.status(201).send('user submitted to DB');
    }
  })
});

function redirectUnmatched(req, res) {
  res.redirect(process.env.HOSTNAME + '/');
}

app.use(redirectUnmatched);

app.listen(process.env.PORT, () => {
  console.log('listening to port ', process.env.PORT);
});

module.exports.app = app;
