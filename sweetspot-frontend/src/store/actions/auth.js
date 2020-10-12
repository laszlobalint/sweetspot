import * as actionTypes from './action-types';

export const authenticate = (username, password) => {
  return {
    type: actionTypes.AUTHENTICATE,
    username,
    password,
  };
};

export const authenticateInitialized = () => {
  return {
    type: actionTypes.AUTHENTICATE_INITIALIZED,
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

export const authenticateLogout = () => {
  return {
    type: actionTypes.AUTHENTICATE_LOGOUT,
  };
};

export const authenticateReload = (token) => {
  return {
    type: actionTypes.AUTHENTICATE_RELOAD,
    token,
  };
};
