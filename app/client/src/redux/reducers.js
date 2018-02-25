import { combineReducers } from 'redux';
import calendarsReducer from './reducers/calendarsReducer';
import calendarReducer from './reducers/calendarReducer';

const rootReducer = combineReducers({
   calendars : calendarsReducer,
   calendar: calendarReducer });
 
export default rootReducer;
