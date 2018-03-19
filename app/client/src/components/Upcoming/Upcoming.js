import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { openEventDetails } from '../../redux/actions';
import './Upcoming.css';

function Upcoming(props) {
  return (
    <div className="Upcoming">
      <div className="Upcoming-header">Upcoming Events</div>

      <div>
        { props.events.map(x => <UpcomingEvent dispatch={props.dispatch} key={x.id} event={x} />) }
      </div>
    </div>
  );
}

function UpcomingEvent(props) {
  return (
    <div className="Upcoming-event" onClick={() => props.dispatch(openEventDetails(props.event.id))}>
      <div className="Upcoming-event-title">{props.event.title}</div>
      <div className="Upcoming-event-from">{moment(props.event.from).calendar()}</div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(Upcoming);
