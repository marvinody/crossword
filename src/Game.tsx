import React from 'react';
import { Board } from './Board';
import { CharSelect } from './CharSelect';

const Game: React.FC = () => {
  return (
    <React.Fragment>
      <Board></Board>
      <CharSelect></CharSelect>
    </React.Fragment>
  );
}

export default Game;
