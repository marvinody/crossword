import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';
const LandingPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className='page-title'>
        <h1>Welcome to crossword</h1>
        <h3>Click <Link to='/game'>here</Link> to start playing or read up on it below</h3>
      </div>
      <div className='page-desc'>
        <p>This is an attempt to copy the general feel of a game called wordscapes which you're given a crossword layout (without hints) and a character bank. You then create words by selecting characters in orders (by clicking and dragging) and see if that word is in the puzzle!</p>
        <p>There's only one level at this point, but more could be added if I had time to write the generator. They are currently hand written puzzles which is time-consuming. </p>
        <p>Check out the <a href='https://github.com/marvinody/crossword'>source</a>, written in React TypeScript and Sass, my first experience with both!</p>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
