import React from 'react';
import './App.css';
import { CharInfo, CharSelect } from './CharSelect';

const newChars = (s: string) => s.split('').map((c: string, i: number) => ({ char: c, isSelected: false, order: i }))

const data: Array<CharInfo> = newChars('cats')

const App: React.FC = () => {
  return (
    <div className="App">
      <CharSelect letters={data}></CharSelect>
    </div>
  );
}

export default App;
