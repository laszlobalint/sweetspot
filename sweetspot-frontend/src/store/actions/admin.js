import * as actionTypes from './action-types';

export const fetchOrdersAdmin = () => {
  return {
    type: actionTypes.FETCH_ORDERS_ADMIN,
  };
};

export const fetchOrdersAdminInitialized = () => {
  return {
    type: actionTypes.FETCH_ORDERS_ADMIN_INITIZALITED,
  };
};

export const fetchOrdersAdminSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_ADMIN_SUCCESS,
    orders,
  };
};

export const fetchOrdersAdminFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_ADMIN_FAILURE,
    error,
  };
};
