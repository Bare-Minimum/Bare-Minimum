import React from 'react';

const TripEntry = (props) => {

  let startDate = Date.parse(props.trip.startDate);
  let startNewDate = new Date(startDate);
  let startYear = startNewDate.getFullYear();
  let startMonth = startNewDate.getMonth() + 1;
  let startDay = startNewDate.getDate();
  let startDateFormat =  startMonth + '/' + startDay + '/' + startYear

  let endDate = Date.parse(props.trip.endDate);
  let endNewDate = new Date(endDate);
  let endYear = endNewDate.getFullYear();
  let endMonth = endNewDate.getMonth() + 1;
  let endDay = endNewDate.getDate();
  let endDateFormat =  endMonth + '/' + endDay + '/' + endYear
  
	return (
	  <tr> 
	    <td onClick={props.onClick}><a href='#'>{props.trip.name}</a></td>
	    <td>{props.trip.location}</td>
	    <td>{startDateFormat}</td>
	    <td>{endDateFormat}</td>
	    <td>{props.trip.accessCode}</td>
	  </tr>
	)
}

export default TripEntry;
