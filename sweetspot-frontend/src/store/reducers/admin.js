import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  picture: null,
  error: null,
  loading: false,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_ADMIN_INITIZALITED:
    case actionTypes.SAVE_ITEM_IMAGE_INITIZALITED:
    case actionTypes.SAVE_NEW_ITEM_INITIZALITED:
    case actionTypes.EDIT_ITEM_INITIZALITED:
    case actionTypes.DELETE_ITEM_INITIALIZED:
      return updateObject(state, { error: null, loading: true, picture: null });
    case actionTypes.SAVE_NEW_ITEM_SUCCESS:
    case actionTypes.EDIT_ITEM_SUCCESS:
    case actionTypes.DELETE_ITEM_SUCCESS:
      return updateObject(state, { error: null, loading: false, picture: null });
    case actionTypes.FETCH_ORDERS_ADMIN_SUCCESS:
      return updateObject(state, { orders: filterOrders(action.orders), error: null, loading: false, picture: null });
    case actionTypes.SAVE_ITEM_IMAGE_SUCCESS:
      return updateObject(state, { error: null, loading: false, picture: action.fileData.filename });
    case actionTypes.FETCH_ORDERS_ADMIN_FAILURE:
    case actionTypes.SAVE_NEW_ITEM_FAILURE:
    case actionTypes.EDIT_ITEM_FAILURE:
    case actionTypes.DELETE_ITEM_FAILURE:
    case actionTypes.SAVE_ITEM_IMAGE_FAILURE:
      return updateObject(state, { error: action.error.message, loading: false, picture: null });
    default:
      return state;
  }
};

const filterOrders = (orders) => orders.filter((order) => new Date(order.deliveryDate) > new Date());
