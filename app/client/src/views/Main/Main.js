import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Upcoming from '../../components/Upcoming/Upcoming';
import './Main.css';

function Main(props) {
  return (
    <div className="Content">
      <div className="Calendars">
        <Calendar date={props.calendars[0]} events={props.events} />
        <Calendar date={props.calendars[1]} events={props.events} />
      </div>
    
      <Upcoming />
    </div>
  );
}

export default Main;