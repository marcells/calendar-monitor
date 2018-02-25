import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadCalendar } from '../../redux/actions';
import Main from '../Main/Main';

class CalendarApp extends Component {
  async componentDidMount() {
    this.props.dispatch(loadCalendar(this.props.calendar));

    this._timer = setInterval(() => this.props.dispatch(loadCalendar(this.props.calendar)), 10000);
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  render() {
    return (
        <Main calendar={this.props.calendar} calendars={this.props.calendars} upcoming={this.props.upcoming} />
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
