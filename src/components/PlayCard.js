/* eslint-disable react/prop-types */
import React from 'react';

const PlayCard = props => {
  return (
    <button
      style={{ backgroundColor: 'lightgray' }}
      onClick={props.onClick}
    >
      {props.card}
    </button>
  );
};

export default PlayCard;