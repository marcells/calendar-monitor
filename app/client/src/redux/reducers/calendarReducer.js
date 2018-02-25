import { createReducer, updateObject } from './helpers';
import {
  LOAD_CALENDAR,
  LOAD_CALENDAR_SUCCESS } from '../actionTypes';

function loadCalendar(state, action) {
  return updateObject(state, {});
}

function loadCalendarSuccess(state, action) {
  return updateObject(state, {
    calendars: action.calendars,
    upcoming: action.upcoming
  });
}

const initialCalendarState = {
  calendars: [],
  upcoming: []
};

const calendarReducer = createReducer(initialCalendarState, {
  [LOAD_CALENDAR]: loadCalendar,
  [LOAD_CALENDAR_SUCCESS]: loadCalendarSuccess
});

export default calendarReducer;
