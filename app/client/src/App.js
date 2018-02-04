import React, { Component } from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.css';

class App extends Component {
  render() {
    const calendar1 = { month: 0, year: 2018 };
    const calendar2 = { month: 1, year: 2018 };

    return (
      <div className="App">
        <div className="Content">
          <div className="Calendars">
            <Calendar date={calendar1} />
            <Calendar date={calendar2} />
          </div>

          <div className="Upcoming">
            Upcoming Events
          </div>
        </div>
      </div>
    );
  }
}

export default App;