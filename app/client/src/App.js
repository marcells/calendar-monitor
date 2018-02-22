import React, { Component } from 'react';
import CalendarApp from './CalendarApp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact={true} path="/" component={Welcome} />
          <Route path="/calendar/:calendar" component={CalendarView} />
        </div>
      </Router>
    );
  }
}

const Welcome = () => (
  <div>Welcome!</div>
);

const CalendarView = ({ match }) => (
  <CalendarApp calendar={match.params.calendar} />
);

export default App;