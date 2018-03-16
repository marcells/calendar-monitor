import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadCalendar, closeEventDetails } from '../../redux/actions';
import Calendar from '../../components/Calendar/Calendar';
import Upcoming from '../../components/Upcoming/Upcoming';
import Modal from 'react-modal';
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

        <Modal isOpen={this.props.showEventDetails}>
          <span style={ { fontSize: '20pt' }}>Event-Details</span>
          <button onClick={() => this.props.dispatch(closeEventDetails()) }>Close</button>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { calendars, upcoming } = state.calendar;
  const { isOpen } = state.eventDetails;

  return {
    calendarId: ownProps.calendar,
    calendars,
    upcoming,
    showEventDetails: isOpen
  };
}

export default connect(mapStateToProps)(CalendarApp);
