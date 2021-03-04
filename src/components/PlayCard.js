/* eslint-disable react/prop-types */
import React from 'react';

const PlayCard = props => {
  return (
    <div>{
      props.status === 'visible' ? (
        <button
          style={{ backgroundColor: 'lightgray', height: 50, width: 50 }}
          onClick={props.onClick}
        >
          {props.card}
        </button>
      ) : (
        <button
          style={{ backgroundColor: 'lightgray', height: 50, width: 50 }}
          onClick={props.onClick}
        >
        </button>
      )
    }
    </div>
  );
};

export default PlayCard;