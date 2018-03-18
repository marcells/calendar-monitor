import axios from 'axios';
import {
  LOAD_CALENDARS,
  LOAD_CALENDARS_SUCCESS,
  LOAD_CALENDAR,
  LOAD_CALENDAR_SUCCESS,
  OPEN_EVENTDETAILS,
  CLOSE_EVENTDETAILS } from './actionTypes'

export const loadCalendars = () => {
 return async dispatch => {
    dispatch({ type: LOAD_CALENDARS });

    const response = await axios.get('/api/calendars');

    dispatch({ type: LOAD_CALENDARS_SUCCESS, calendars: response.data.calendars });
  };
};

export const loadCalendar = (calendarId) => {
  return async dispatch => {
    dispatch({ type: LOAD_CALENDAR, calendarId: calendarId });

    const upcoming = await axios.get(`/api/upcoming/${calendarId}`);
    const calendars = await axios.get('/api/nextCalendars/2');
    const calendarsWithEvents = await getCalendarsWithEvents(calendarId, calendars.data.calendars);

    dispatch({
      type: LOAD_CALENDAR_SUCCESS,
      calendarId: calendarId,
      calendars: calendarsWithEvents,
      upcoming: upcoming.data.events
    });
   };
 };

export const openEventDetails = (id) => {
  return async dispatch => {
    dispatch({
      type: OPEN_EVENTDETAILS,
      event: {
        id
      }
    });
  };
 };

export const closeEventDetails = () => {
  return async dispatch => {
    dispatch({ type: CLOSE_EVENTDETAILS });

    await axios.get('/api/nextCalendars/2');
  };
};

const getCalendarsWithEvents = async (calendarId, calendars) => {
  const calendarsWithEvents = [];

  for (const calendar of calendars) {
    const events = await axios.get(`/api/calendar/${calendarId}/${calendar.year}/${calendar.month}`);

    calendarsWithEvents.push({
      date: calendar,
      events: events.data.events
    });
  }

  return calendarsWithEvents;
};
