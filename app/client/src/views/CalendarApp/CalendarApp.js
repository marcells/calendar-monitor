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
    const calendarsWithEvents = await this._getCalendarsWithEvents(calendars.data.calendars);

    this.setState({
      calendars: calendarsWithEvents,
      upcoming: upcoming.data.events
    });
  }

  async _getCalendarsWithEvents(calendars) {
    const calendarsWithEvents = [];

    for (const calendar of calendars) {
      const events = await axios.get(`/api/calendar/${this.props.calendar}/${calendar.year}/${calendar.month}`);

      calendarsWithEvents.push({
        date: calendar,
        events: events.data.events
      });
    }

    return calendarsWithEvents;
  }
}

export default CalendarApp;
