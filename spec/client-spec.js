const expect = require('chai').expect;
const Redux = require('Redux');
const reducers = require('../client/src/Reducers');
const { createStore } = Redux;

describe('Client-side Redux Store', function () {

  store = createStore(reducers.travelReducer);
  let { getState } = store;
  let userName;

  it ('should initialize an empty Redux store with user and trip', function(done) {
    expect(getState().user).to.exist;
    expect(getState().trip).to.exist;
    done();
  });

  it ('should be able to change the current user', function(done) {
    userName = 'Dandai';
    store.dispatch(reducers.changeUser(userName));
    expect(getState().user).to.equal(userName);
    expect(getState().user).to.not.equal(userName + '-not-me');
    done();
  });

  it ('should be able to change the current trip and preserve the user', function(done) {
    let tripName = 'Poveglia Ghost Hunt 2018';
    store.dispatch(reducers.changeTrip(tripName));
    expect(getState().trip).to.equal(tripName);
    expect(getState().user).to.equal(userName);
    done();
  });

  it ('should be able to change the current view', function(done) {
    let viewName = 'MapView';
    store.dispatch(reducers.changeView(viewName));
    expect(getState().view).to.equal(viewName);
    done();
  });
});
