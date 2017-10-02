const APP_VIEWS = require('../appViewsList').APP_VIEWS;

/*
SYMBOLS - How a user might alter state
*/

const CHANGE_USER = 'CHANGE_USER';
const CHANGE_TRIP = 'CHANGE_TRIP';
const CHANGE_VIEW = 'CHANGE_VIEW';

/*
ACTIONS
*/
const changeUser = (user = '') => ({
  type: CHANGE_USER,
  user
});

const changeTrip = (trip = '') => ({
  type: CHANGE_TRIP,
  trip
});

const changeView = (view = '') => ({
  type: CHANGE_VIEW,
  view
});

/*
REDUCERS
*/

const initialState = {
  user: '',
  trip: '',
  view: 'TripManager'
};

const travelReducer = (state = initialState, action) => {
  // console.log('Store action:', action);

  switch (action.type) {
  case CHANGE_USER:
    return Object.assign({}, state, {user: action.user});
  case CHANGE_TRIP:
    return Object.assign({}, state, {trip: action.trip});
  case CHANGE_VIEW:
    return Object.assign({}, state, {view: action.view});
  default:
    return state;
  }
};

module.exports = {
  travelReducer,
  changeUser,
  changeTrip,
  changeView
};

/*
Usage:
  store.dispatch(changeUser('ChristieV'));
  store.dispatch(changeTrip('Poveglia'));
*/
