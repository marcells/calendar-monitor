import { combineReducers } from 'redux';
import {
  LOAD_CALENDARS,
  LOAD_CALENDARS_SUCCESS,
  LOAD_CALENDAR,
  LOAD_CALENDAR_SUCCESS } from './actionTypes';

function updateObject(state, newValues) {
  return Object.assign({}, state, newValues);
}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

function loadCalendars(state, action) {
  return updateObject(state, {});
}

function loadCalendarsSuccess(state, action) {
  return updateObject(state, {
    items: action.calendars
  });
}

const initialCalendarsState = { items: [] };

function calendarsReducer(state = initialCalendarsState, action) {
  switch (action.type) {
    case LOAD_CALENDARS: return loadCalendars(state, action);
    case LOAD_CALENDARS_SUCCESS: return loadCalendarsSuccess(state, action);
    default: return state;
  }
}

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

function calendarReducer(state = initialCalendarState, action) {
  switch (action.type) {
    case LOAD_CALENDAR: return loadCalendar(state, action);
    case LOAD_CALENDAR_SUCCESS: return loadCalendarSuccess(state, action);
    default: return state;
  }
}

const rootReducer = combineReducers({
   calendars : calendarsReducer,
   calendar: calendarReducer });
 
export default rootReducer;
