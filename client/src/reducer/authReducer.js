import isEmpty from '../validation/is-empty';

import {GET_ERRORS, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors:action.payload
      }
    default:
      return state;
  }
}
