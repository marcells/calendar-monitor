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
    await this._loadCalendars();

    this._timer = setInterval(async () => await this._loadCalendars(), 10000);
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  render() {
    return (
        <Main calendar={this.props.calendar} calendars={this.state.calendars} upcoming={this.state.upcoming} />
    );
  }

  async _loadCalendars() {
    const calendars = await axios.get('/api/nextCalendars/2');
    const upcoming = await axios.get(`/api/upcoming/${this.props.calendar}`);

    this.setState({
      calendars: calendars.data.calendars,
      upcoming: upcoming.data.events
    });
  }
}

export default CalendarApp;
