import React, { Component } from 'react';
import Main from './views/Main/Main';
import './App.css';

class App extends Component {
  render() {
    const calendar1 = { month: 0, year: 2018 };
    const calendar2 = { month: 1, year: 2018 };
    const events = [
      {
        title: 'Event 1',
        from: new Date(2018, 0, 1, 19, 0, 0),
        to: new Date(2018, 0, 1, 22, 0, 0)
      },
      {
        title: 'Event 2',
        from: new Date(2018, 0, 3, 19, 0, 0),
        to: new Date(2018, 0, 3, 22, 0, 0)
      },
      {
        title: 'Event 3',
        from: new Date(2018, 0, 3, 19, 0, 0),
        to: new Date(2018, 0, 3, 22, 0, 0)
      },
      {
        title: 'Event 4',
        from: new Date(2018, 0, 3, 19, 0, 0),
        to: new Date(2018, 0, 3, 22, 0, 0)
      },
      {
        title: 'Event 5',
        from: new Date(2018, 1, 3, 19, 0, 0),
        to: new Date(2018, 1, 3, 22, 0, 0)
      },
      {
        title: 'Event 6',
        from: new Date(2018, 1, 3, 19, 0, 0),
        to: new Date(2018, 1, 3, 22, 0, 0)
      }
    ];

    return (
      <div className="App">
        <Main calendars={[calendar1, calendar2]} events={events} upcoming={events} />
      </div>
    );
  }
}

export default App;