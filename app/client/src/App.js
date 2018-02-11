import React, { Component } from 'react';
import Main from './views/Main/Main';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      calendars: [], 
      events: [],
      upcoming: []
    };
  }

  async componentDidMount() {
    const calendars = await axios.get('/api/nextCalendars/2');
    const upcoming = await axios.get('/api/upcoming');
    
    this.setState({ 
      calendars: calendars.data.calendars,
      upcoming: upcoming.data.events 
    });
  }

  render() {
    return (
      <div className="App">
        <Main calendars={this.state.calendars} upcoming={this.state.upcoming} />
      </div>
    );
  }
}

export default App;