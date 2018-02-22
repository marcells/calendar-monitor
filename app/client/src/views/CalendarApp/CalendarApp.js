import React, { Component } from 'react';
import Main from '../Main/Main';
import axios from 'axios';

class CalendarApp extends Component {
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
    const upcoming = await axios.get(`/api/upcoming/${this.props.calendar}`);
    
    this.setState({ 
      calendars: calendars.data.calendars,
      upcoming: upcoming.data.events 
    });
  }

  render() {
    return (
        <Main calendar={this.props.calendar} calendars={this.state.calendars} upcoming={this.state.upcoming} />
    );
  }
}

export default CalendarApp;