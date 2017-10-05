import React from 'react';

const TripEntry = (props) => (
  <div onClick={props.onClick}>{props.trip.name}</div>
)



export default TripEntry;
