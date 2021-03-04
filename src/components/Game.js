/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PlayCard from './PlayCard';
import PlayAgain from './PlayAgain';
import utils from '../math-utils';

const useGameState = () => {
  const [candidateCards, setCandidateCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState(utils.range(1, 9).concat(utils.range(1, 9)));
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    if (hiddenCards.length > 0) {
      const timer = setTimeout(() => setSecondsPassed(secondsPassed + 1), 1000);
      return () => clearTimeout(timer);
    }
  });

  const setGameState = (newCandidateCards) => {
    if (newCandidateCards[0] !== newCandidateCards[1]) {
      setHiddenCards(hiddenCards.concat(newCandidateCards));
    } else {
      const newHiddenCards = hiddenCards.filter(
        c => !newCandidateCards.includes(c)
      );
      setHiddenCards(newHiddenCards);
      setVisibleCards(visibleCards.concat(newCandidateCards));
    }
    setCandidateCards([]);
  };

  const startNewGame = () => {
    setCandidateCards([]);
    setVisibleCards([]);
    setHiddenCards(utils.range(1, 9));
    setSecondsPassed(0);
  };

  return { candidateCards, visibleCards, hiddenCards, secondsPassed, setGameState, startNewGame };
};

const Game = props => {
  const {
    candidateCards,
    hiddenCards,
    secondsPassed,
    setGameState,
    startNewGame
  } = useGameState();

  const candidateCardsAreWrong = candidateCards[0] !== candidateCards[1];
  const gameStatus = hiddenCards.length === 0
    ? 'won' : 'active';

  const cardStatus = card => {
    if (!hiddenCards.includes(card)) {
      return 'visible';
    }

    if (candidateCards.includes(card)) {
      return candidateCardsAreWrong ? 'wrong' : 'candidate';
    }

    return 'hidden';
  }

  const onCardClick = (card, currentStatus) => {
    if (currentStatus === 'visible') {
      return;
    }

    const newCandidateCards = [card, card]

    setGameState(newCandidateCards);
  }

  return (
    <div className="game">
      <div className="help">
        Pick 2 cards to see if they match.
      </div>
      <div className="body">
        <div className="gameStatus">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={() => {
              props.startNewGame;
              startNewGame();
            }} />
          ) : (
            <div className="cardLayout">
              {utils.range(1, 9).map(card => (
                (
                  <PlayCard
                    key={`${card}a`}
                    status={cardStatus(card)}
                    card={card}
                    onClick={() => onCardClick(card, cardStatus(card))}
                  />
                )
              ))}
              {utils.range(1, 9).map(card => (
                (
                  <PlayCard
                    key={`${card}b`}
                    status={cardStatus(card)}
                    card={card}
                    onClick={() => onCardClick(card, cardStatus(card))}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="timer">
        Elapsed Time: {secondsPassed}
      </div>
    </div>
  );
};

export default Game;