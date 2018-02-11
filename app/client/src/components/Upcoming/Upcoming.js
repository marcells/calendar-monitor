import React from 'react';
import moment from 'moment';
import './Upcoming.css';

function Upcoming(props) {
  return (
    <div className="Upcoming">
      <div className="Upcoming-header">Upcoming Events</div>

      <div>
        { props.events.map(x => <UpcomingEvent key={x} event={x} />) }
      </div>
    </div>
  );
}

function UpcomingEvent(props) {
  return (
    <div className="Upcoming-event">
      <div className="Upcoming-event-title">{props.event.title}</div>
      <div className="Upcoming-event-from">{moment(props.event.from).calendar()}</div>
    </div>
  );
}

export default Upcoming;