import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  items: [],
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
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

const filterOrders = (orders) => orders.filter((order) => new Date(order.deliveryDate) > new Date());
