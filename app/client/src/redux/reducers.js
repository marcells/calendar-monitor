import { combineReducers } from 'redux';
import calendarsReducer from './reducers/calendarsReducer';
import calendarReducer from './reducers/calendarReducer';
import eventDetailsReducer from './reducers/eventDetailsReducer';

const rootReducer = combineReducers({
   calendars : calendarsReducer,
   calendar: calendarReducer,
   eventDetails: eventDetailsReducer
});

export default rootReducer;
