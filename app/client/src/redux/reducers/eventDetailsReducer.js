import { createReducer, updateObject } from './helpers';
import {
  OPEN_EVENTDETAILS,
  CLOSE_EVENTDETAILS } from '../actionTypes';

function openEventDetails(state, action) {
  return updateObject(state, {
    isOpen: true
  });
}

function closeEventDetails(state, action) {
  return updateObject(state, {
    isOpen: false
  });
}

const initialEventDetailsState = { isOpen: false };

const eventDetailsReducer = createReducer(initialEventDetailsState, {
  [OPEN_EVENTDETAILS]: openEventDetails,
  [CLOSE_EVENTDETAILS]: closeEventDetails
});

export default eventDetailsReducer;
