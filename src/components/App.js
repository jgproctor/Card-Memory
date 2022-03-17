import React, { useState } from 'react';
import Game from './Game';

const App = () => {
  const [gameId] = useState(1);
  return (<Game key={gameId} />);
}

export default App;