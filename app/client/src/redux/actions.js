import axios from 'axios';
import { LOAD_CALENDARS, LOAD_CALENDARS_SUCCESS } from './actionTypes'

export const loadCalendars = () => {
 return async dispatch => {
    dispatch({ type: LOAD_CALENDARS });

    const response = await axios.get('/api/calendars');

    dispatch({ type: LOAD_CALENDARS_SUCCESS, calendars: response.data.calendars })
  }
};
