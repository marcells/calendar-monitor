import React from 'react';
import moment from 'moment';
import './Calendar.css';

function Calendar(props) {
  return (
      <div className="Calendar">
        <CalendarHeader date={props.date} />
        <CalendarDays date={props.date} events={props.events} />
      </div>
    );
}
  
function CalendarDays(props) {
  const lastDayOfMonth = new Date(props.date.year, props.date.month + 1, 0).getDate();
  const days = Array(lastDayOfMonth).fill().map((e,i)=> i + 1);
  
  const eventsForDay = day => {
    const dateForDay = moment(new Date(props.date.year, props.date.month, day));

    return props.events.filter(x => dateForDay.isBetween(x.from, x.to, 'day', '[]'));
  }

  return (
      <div className="Calendar-days">
        { days.map(x => <CalendarDay key={x} year={props.date.year} month={props.date.month} day={x} events={eventsForDay(x)} />) }
      </div>
    );
}

function CalendarDay(props) {
  const gridColumnStyle = (props.day === 1) 
    ? { gridColumn : new Date(props.year, props.month, 1).getDay() + 1 }
    : { };

  const isWeekend = new Date(props.year, props.month, props.day).getDay() == 0;
  const isToday = moment(new Date(props.year, props.month, props.day)).isSame(new Date(), 'day');

  const calendarDayClassNames = [
    'Calendar-day',
    isWeekend ? 'Calendar-day-is-weekend': 'Calendar-day-is-workday',
    isToday ? 'Calendar-day-is-today' : ''
  ].join(' ');

  return (
    <div className={calendarDayClassNames} style={gridColumnStyle}>
      <div className="Calendar-day-column">{props.day}</div>
      
      <div className="Calendar-day-events">
        <ul>
          {props.events.map(x => <li className="Calendar-day-event">{x.title}</li>)}
        </ul>
      </div>
    </div>
  );
}

function CalendarHeader(props) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <div className="Calendar-header">
      <div className="Calendar-header-month">
        { monthNames[props.date.month] }
      </div>
      <div className="Calendar-header-weekdays">
        {weekDayNames.map(x => <div>{x}</div>)}
      </div>
    </div>
  );
}

export default Calendar;