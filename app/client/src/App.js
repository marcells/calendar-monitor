import React, { Component } from 'react';
import Main from './views/Main/Main';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      calendars: [ { month: 1, year: 2018 }, { month: 2, year: 2018 } ], 
      events: [],
      upcoming: []
    };
  }

  async componentDidMount() {
    const calendars = await axios.get('/api/nextCalendars/2');
    const events = await axios.get('/api/calendar/0/0');
    const upcoming = await axios.get('/api/upcoming');
    
    this.setState({ 
      calendars: calendars.data.calendars,
      events: events.data.events,
      upcoming: upcoming.data.events 
    });
  }

  render() {
    return (
      <div className="App">
        <Main calendars={this.state.calendars} events={this.state.events} upcoming={this.state.upcoming} />
      </div>
    );
  }
}

export default App;