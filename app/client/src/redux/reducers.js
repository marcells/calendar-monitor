import { combineReducers } from 'redux';
import { LOAD_CALENDARS, LOAD_CALENDARS_SUCCESS } from './actionTypes';

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

const rootReducer = combineReducers({ calendars });
 
export default rootReducer;
