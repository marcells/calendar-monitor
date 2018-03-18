import { createReducer, updateObject } from './helpers';
import {
  OPEN_EVENTDETAILS,
  CLOSE_EVENTDETAILS } from '../actionTypes';

function openEventDetails(state, action) {
  return updateObject(state, {
    isOpen: true,
    event: action.event
  });
}

function closeEventDetails(state, action) {
  return updateObject(state, {
    isOpen: false,
    event: { tags: [] }
  });
}

const initialEventDetailsState = { isOpen: false, event: { tags: [] } };

const eventDetailsReducer = createReducer(initialEventDetailsState, {
  [OPEN_EVENTDETAILS]: openEventDetails,
  [CLOSE_EVENTDETAILS]: closeEventDetails
});

export default eventDetailsReducer;
