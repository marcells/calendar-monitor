import { createReducer, updateObject } from './helpers';
import {
  LOAD_CALENDARS,
  LOAD_CALENDARS_SUCCESS } from '../actionTypes';

function loadCalendars(state, action) {
  return updateObject(state, {});
}

function loadCalendarsSuccess(state, action) {
  return updateObject(state, {
    items: action.calendars
  });
}

const initialCalendarsState = { items: [] };

const calendarsReducer = createReducer(initialCalendarsState, {
  [LOAD_CALENDARS]: loadCalendars,
  [LOAD_CALENDARS_SUCCESS]: loadCalendarsSuccess
});

export default calendarsReducer;
