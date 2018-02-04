import React, { Component } from 'react';
import Main from './views/Main/Main';
import './App.css';

class App extends Component {
  render() {
    const calendar1 = { month: 0, year: 2018 };
    const calendar2 = { month: 1, year: 2018 };

    return (
      <div className="App">
        <Main calendars={ [calendar1, calendar2] }/>
      </div>
    );
  }
}

export default App;