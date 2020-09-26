import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../shared/utility';

const initialState = {
  items: [],
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
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};
