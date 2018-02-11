import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import './Calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = { events : [] };
  }

  async componentDidMount() {
    const events = await axios.get(`/api/calendar/${this.props.date.year}/${this.props.date.month}`);

    this.setState({ events: events.data.events });
  }

  render() {
    return (
        <div className="Calendar">
          <CalendarHeader date={this.props.date} />
          <CalendarDays date={this.props.date} events={this.state.events} />
        </div>
      );
  }
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

  const isWeekend = new Date(props.year, props.month, props.day).getDay() === 0 || new Date(props.year, props.month, props.day).getDay() === 6;
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
        { props.events.map(x => <div key={x.id} className="Calendar-day-event">
                                  <span className="Calendar-day-event-from">{moment(x.from).format('HH:mm')}</span>
                                  <span className="Calendar-day-event-title">{x.title}</span>
                                </div>) }
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
        {weekDayNames.map(x => <div key={x}>{x}</div>)}
      </div>
    </div>
  );
}

export default Calendar;