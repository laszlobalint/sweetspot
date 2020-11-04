import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  items: [],
  picture: null,
  error: null,
  loading: false,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_ADMIN_INITIZALITED:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_ORDERS_ADMIN_SUCCESS:
      return updateObject(state, { orders: filterOrders(action.orders), error: null, loading: false });
    case actionTypes.FETCH_ORDERS_ADMIN_FAILURE:
      return updateObject(state, { error: action.error.message, loading: false });
    case actionTypes.SAVE_ITEM_IMAGE_INITIZALITED:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.SAVE_ITEM_IMAGE_SUCCESS:
      return updateObject(state, { picture: action.fileData.filename, error: null, loading: false });
    case actionTypes.SAVE_ITEM_IMAGE_FAILURE:
      return updateObject(state, { picture: null, error: action.error.message, loading: false });
    case actionTypes.SAVE_NEW_ITEM_INITIZALITED:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.SAVE_NEW_ITEM_SUCCESS:
      return updateObject(state, { error: null, loading: false, picture: null });
    case actionTypes.SAVE_NEW_ITEM_FAILURE:
      return updateObject(state, { error: action.error.message, loading: false, picture: null });
    default:
      return state;
  }
};

const filterOrders = (orders) => orders.filter((order) => new Date(order.deliveryDate) > new Date());
