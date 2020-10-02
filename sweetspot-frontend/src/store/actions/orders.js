import * as actionTypes from './action-types';

export const fetchOrderItems = () => {
  return {
    type: actionTypes.FETCH_ORDER_ITEMS,
  };
};

export const fetchOrderItemsInitialized = () => {
  return {
    type: actionTypes.FETCH_ORDER_ITEMS_INITIALIZED,
  };
};

export const fetchOrderItemsSuccess = (items) => {
  return {
    type: actionTypes.FETCH_ORDER_ITEMS_SUCCESS,
    items,
  };
};

export const fetchOrderItemsFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_ITEMS_FAILURE,
    error,
  };
};

export const addOrderItems = (id, price, quantity) => {
  return {
    type: actionTypes.ADD_ORDER_ITEMS,
    id,
    price,
    quantity,
  };
};

export const removeOrderItems = (id) => {
  return {
    type: actionTypes.REMOVE_ORDER_ITEMS,
    id,
  };
};
