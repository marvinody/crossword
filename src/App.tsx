import React from 'react';
import './App.css';
import { Board } from './Board';
import { CharSelect } from './CharSelect';

const App: React.FC = () => {
  return (
    <div className="App">
      <Board></Board>
      <CharSelect></CharSelect>
    </div>
  );
}

export default App;
