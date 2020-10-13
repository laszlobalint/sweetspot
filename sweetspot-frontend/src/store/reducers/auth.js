import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_INITIALIZED:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTHENTICATE_SUCCESS:
      return updateObject(state, { token: action.token, error: null, loading: false });
    case actionTypes.AUTHENTICATE_FAILURE:
      return updateObject(state, { error: action.error.message, loading: false });
    case actionTypes.AUTHENTICATE_LOGOUT:
      return updateObject(state, { token: null, error: null, loading: false });
    case actionTypes.AUTHENTICATE_RELOAD:
      return updateObject(state, { token: action.token });
    default:
      return state;
  }
};
