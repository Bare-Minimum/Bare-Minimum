import React from 'react';
import Popup from 'react-popup';

// pass User from store to this component
// render random profile pic
// render input fields for phone number, itinerary,
const UserInfo = (props) => {
  if(!props.user) {
    return null;
  }

  return (
    <div className="user-details">
      <div>Phone: {props.user.phone}</div>
      <div>Itinerary: {props.user.flightItinerary}</div>
    </div>

  )
}

export default UserInfo;
