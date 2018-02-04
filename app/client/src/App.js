import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const calendar1 = { month: 0, year: 2018 };
    const calendar2 = { month: 1, year: 2018 };

    return (
      <div className="App">
        <div className="Content">
          <div className="Calendars">
            <Calendar date={calendar1} />
            <Calendar date={calendar2} />
          </div>

          <div className="Upcoming">
            Upcoming Events
          </div>
        </div>
      </div>
    );
  }
}

function Calendar(props) {
  return (
    <div className="Calendar">
      <CalendarHeader date={props.date} />
      <CalendarDays date={props.date} />
    </div>
  );
}

function CalendarDays(props) {
  const lastDayOfMonth = new Date(props.date.year, props.date.month + 1, 0).getDate();
  const days = Array(lastDayOfMonth).fill().map((e,i)=> i + 1);

  return (
      <div className="Calendar-days">
        { days.map(x => <CalendarDay key={x} year={props.date.year} month={props.date.month} day={x} />) }
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
        { weekDayNames.map(x => <div>{ x }</div>)}
      </div>
    </div>
  );
}

function CalendarDay(props) {
  const gridColumnStyle = (props.day === 1) 
    ? { gridColumn : new Date(props.year, props.month, 1).getDay() + 1 }
    : { };

  return (
    <div className="Calendar-day" style={gridColumnStyle}>
      { props.day }
    </div>
  );
}

export default App;
