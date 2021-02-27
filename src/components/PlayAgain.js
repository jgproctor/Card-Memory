/* eslint-disable react/prop-types */
import React from 'react';

const PlayAgain = props => {
  return (
    <div className="game-done">
      <div
        style={{ color: props.gameStatus === 'won' ? 'green' : 'yellow' }}
      >
        {props.gameStatus === 'won' ? 'Winner!' : 'Game in progress...'}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
};

export default PlayAgain;