import React from 'react';

const PlayCard = props => {
  <button
    className="card"
    style={{ backgroundColor: 'lightgray' }}
    onClick={() => props.onClick(props.card, props.status)}
  >
    {props.card}
  </button>
}

export default PlayCard;