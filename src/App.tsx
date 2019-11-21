import React from 'react';
import { } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './Game';
import LandingPage from './LandingPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={LandingPage}></Route>
          <Route path='/game' exact component={Game}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
