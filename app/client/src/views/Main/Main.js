import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Upcoming from '../../components/Upcoming/Upcoming';
import './Main.css';

function Main(props) {
  return (
    <div className="Content">
      <div className="Calendars">
        { props.calendars.map(x => <Calendar key={x.year + x.month} date={x} events={props.events} />) }
      </div>
    
      <Upcoming events={props.upcoming} />
    </div>
  );
}

export default Main;