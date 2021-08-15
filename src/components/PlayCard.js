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
          <input
            type="image"
            style={{ height: 30, width: 30 }}
            src="https://media.istockphoto.com/vectors/circle-with-bitcoin-vector-id874724854?k=6&m=874724854&s=612x612&w=0&h=kQeLNTO5ccXdnr0KG8Ufei01Dl4CUwQShNJhu-k4hRM=" />
        </button>
      )
    }
    </div>
  );
};

export default PlayCard;