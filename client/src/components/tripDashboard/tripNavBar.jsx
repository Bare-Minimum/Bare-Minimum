import React from 'react';
import reducer from '../../Reducers';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

const TripNavBar = (props) => {
  return (
    <ButtonGroup className="tripnav">
      {props.features.map((feature, index) => {
        return <Button key={index} className="btn" onClick={() => {
          props.dispatch(reducer.changeView(feature.link));
        }}>{feature.name}</Button>
      })}
    </ButtonGroup>
  )
};

export default TripNavBar;
