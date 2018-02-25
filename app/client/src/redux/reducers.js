import { combineReducers } from 'redux';
import {
  LOAD_CALENDARS,
  LOAD_CALENDARS_SUCCESS,
  LOAD_CALENDAR,
  LOAD_CALENDAR_SUCCESS } from './actionTypes';

function calendars(
  state = {
    items: []
  },
  action) {
  switch (action.type) {
    case LOAD_CALENDARS:
      return Object.assign({}, state, {
        items: []
      });
    case LOAD_CALENDARS_SUCCESS:
      return Object.assign({}, state, {
        items: action.calendars
      });
    default:
      return state;
  }
}

function calendar(
  state = {
    calendars: [],
    upcoming: []
  },
  action) {
  switch (action.type) {
    case LOAD_CALENDAR:
      return Object.assign({}, state, {
      });
    case LOAD_CALENDAR_SUCCESS:
      return Object.assign({}, state, {
        calendars: action.calendars,
        upcoming: action.upcoming
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({ calendars, calendar });
 
export default rootReducer;
