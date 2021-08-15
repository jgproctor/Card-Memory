/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import PlayCard from './PlayCard';
import PlayAgain from './PlayAgain';

const useGameState = () => {
  const cards = ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b'];
  let isWrongMatch = false;
  let shuffledCards = shuffleArray(cards)
  const [candidateCards, setCandidateCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [hiddenCards, setHiddenCards] = useState(shuffledCards);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [gameCards, setGameCards] = useState(shuffledCards);

  useEffect(() => {
    if (hiddenCards.length > 0) {
      const timer = setTimeout(() => setSecondsPassed(secondsPassed + 1), 1000);
      return () => clearTimeout(timer);
    }
  });

  useRef(() => {
    if (isWrongMatch) {
      const timer = setTimeout(() => { }, 2000);
      isWrongMatch = false;
      return () => clearTimeout(timer);
    }
  });

  const setGameState = (newCandidateCards) => {
    let newHiddenCards;
    if (newCandidateCards.length < 2) {
      newHiddenCards = filterAndSetHiddenCards(newHiddenCards, hiddenCards, newCandidateCards, setHiddenCards);
      setCandidateCards(newCandidateCards);
      setVisibleCards(newCandidateCards);
    } else if (newCandidateCards.length === 2 && newCandidateCards[0][0] === newCandidateCards[1][0]) {
      newHiddenCards = filterAndSetHiddenCards(newHiddenCards, hiddenCards, newCandidateCards, setHiddenCards);
      setVisibleCards(visibleCards.concat(newCandidateCards));
      setCandidateCards([]);
    } else if (newCandidateCards.length == 2 && newCandidateCards[0][0] !== newCandidateCards[1][0]) {
      isWrongMatch = true;
      newHiddenCards = hiddenCards.filter(
        c => !newCandidateCards.includes(c)
      );
      newHiddenCards = newHiddenCards.concat(newCandidateCards);
      setCandidateCards([]);
      setHiddenCards(newHiddenCards);
    }
  };

  const startNewGame = () => {
    setCandidateCards([]);
    setVisibleCards([]);
    let shuffledCards = shuffleArray(cards);
    setGameCards(shuffledCards);
    setHiddenCards(shuffledCards);
    setSecondsPassed(0);
  };

  return { candidateCards, gameCards, hiddenCards, secondsPassed, setGameState, startNewGame };
};

const Game = props => {
  const {
    candidateCards,
    gameCards,
    hiddenCards,
    secondsPassed,
    setGameState,
    startNewGame
  } = useGameState();

  const gameStatus = hiddenCards.length === 0
    ? 'won' : 'active';

  const cardStatus = card => {
    if (!hiddenCards.includes(card)) {
      return 'visible';
    }

    return 'hidden';
  }

  const onCardClick = (card, currentStatus) => {
    if (currentStatus === 'visible') {
      return;
    }

    const newCandidateCards = candidateCards.length < 2 ? candidateCards.concat(card) : candidateCards;
    setGameState(newCandidateCards);
  }

  return (
    <div>
      <div>
        {gameStatus === 'active' ? (
          <div>Pick 2 cards to see if they match. A matching pair is found when 2 cards have matching numbers.</div>
        ) : (<div></div>)}
      </div>
      <div>
        <div>
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={() => {
              props.startNewGame;
              startNewGame();
            }} />
          ) : (
            <div>
              <div>
                {gameCards.map(card => (
                  (
                    <PlayCard
                      key={`${card}`}
                      status={cardStatus(`${card}`)}
                      card={`${card[0]}`}
                      onClick={() => onCardClick(`${card}`, cardStatus(`${card}`))}
                    />
                  )
                ))}
              </div>
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

function filterAndSetHiddenCards(newHiddenCards, hiddenCards, newCandidateCards, setHiddenCards) {
  newHiddenCards = hiddenCards.filter(
    c => !newCandidateCards.includes(c)
  );
  setHiddenCards(newHiddenCards);
  return newHiddenCards;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
