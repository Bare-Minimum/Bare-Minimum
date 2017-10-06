// assume one trip row (obj) is being passed in
const data = {};

data.trip = {
  name: 'Amsterdames Spring Break',
  location: 'Amsterdam',
  startDate: (new Date("2018-03-20")).toString(),
  endDate: (new Date("2018-03-30")).toString(),
  lodging: 'Hotel Cardboard Box'
};

data.users = [
  {
    name: 'Death',
    email: 'deadnotsleeping@gmail.com'
  },
  {
    name: 'Pestilence',
    email: 'admin@angularjs.com'
  },
  {
    name: 'War',
    email: 'fitemeirl@hotmail.com'
  },
  {
    name: 'Famine',
    email: '2hungry4u@yahoo.com'
  }
];

// will probably take click handlers instead of links,
// but can refactor
data.features = [
  {
    name: 'Share Expense',
    link: 'ExpenseTracker'
  },
  {
    name: 'Destinations',
    link: 'Landmarks'
  },
  {
    name: 'Calendar',
    link: 'some_link_to_calendar'
  },
  {
    name: 'Photos',
    link: 'some_link_to_photos'
  }
];

export default data;
