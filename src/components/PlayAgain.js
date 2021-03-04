/* eslint-disable react/prop-types */
import React from 'react';

const PlayAgain = props => {
  return (
    <div className="game-done">
      <div
        style={{ color: 'green' }}
      >
        Winner!
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
};

export default PlayAgain;