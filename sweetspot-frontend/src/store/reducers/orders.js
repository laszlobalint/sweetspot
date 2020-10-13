import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../shared/utility';

const initialState = {
  items: [],
  basket: [],
  grandTotal: 0,
  error: null,
  loading: true,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_ITEMS_INITIALIZED:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_ORDER_ITEMS_SUCCESS:
      return updateObject(state, { items: action.items, error: null, loading: false });
    case actionTypes.FETCH_ORDER_ITEMS_FAILURE:
      return updateObject(state, { error: action.error.message, loading: false });
    case actionTypes.ADD_ORDER_ITEMS:
      return addOrderItems(state, action);
    case actionTypes.REMOVE_ORDER_ITEMS:
      return removeOrderItems(state, action);
    case actionTypes.SAVE_ORDER_INITIALIZED:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.SAVE_ORDER_SUCCESS:
      return updateObject(state, { basket: [], grandTotal: 0, error: null, loading: false });
    case actionTypes.SAVE_ORDER_FAILURE:
      return updateObject(state, { error: action.error.message, loading: false });
    default:
      return state;
  }
};

const addOrderItems = (state, action) => {
  let item = state.basket.find((item) => action.id === item.id);
  if (item) {
    item.quantity += action.quantity;
    return updateObject(state, {
      grandTotal: state.grandTotal + action.price * action.quantity,
      basket: [...state.basket.filter((i) => i.id !== item.id), item],
    });
  } else {
  }
  return updateObject(state, {
    grandTotal: state.grandTotal + action.price * action.quantity,
    basket: [...state.basket, { id: action.id, quantity: action.quantity }],
  });
};

const removeOrderItems = (state, action) => {
  let price = state.items.find((item) => action.id === item.id).price;
  let quantity = state.basket.find((item) => action.id === item.id).quantity;
  return updateObject(state, {
    grandTotal: state.grandTotal - price * quantity,
    basket: state.basket.filter((item) => item.id !== action.id),
  });
};
