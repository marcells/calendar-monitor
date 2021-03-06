import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCalendar } from '../../redux/actions';
import Calendar from '../../components/Calendar/Calendar';
import Upcoming from '../../components/Upcoming/Upcoming';
import EventDetails from '../EventDetails/EventDetails';
import './CalendarApp.css';

class CalendarApp extends Component {
  async componentDidMount() {
    this.props.dispatch(loadCalendar(this.props.calendarId));

    this._timer = setInterval(() => this.props.dispatch(loadCalendar(this.props.calendarId)), 10000);
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  render() {
    return (
      <div className="Content">
        <div className="Calendars">
          { this.props.calendars.map(x => <Calendar key={this.props.calendarId + x.date.year + x.date.month} calendar={x} />) }
        </div>

        <Upcoming events={this.props.upcoming} />

        <EventDetails />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { calendars, upcoming } = state.calendar;

  return {
    calendarId: ownProps.calendar,
    calendars,
    upcoming
  };
}

export default connect(mapStateToProps)(CalendarApp);
