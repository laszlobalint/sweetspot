import * as actionTypes from './action-types';

export const authenticate = (username, password) => {
  return {
    type: actionTypes.AUTHENTICATE,
    username,
    password,
  };
};

export const authenticateSuccess = (token) => {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
    token,
  };
};

export const authenticateFailure = (error) => {
  return {
    type: actionTypes.AUTHENTICATE_FAILURE,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTHENTICATE_LOGOUT,
  };
};
