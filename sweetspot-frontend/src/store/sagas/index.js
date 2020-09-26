import { all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/action-types';
import { fetchOrderItemsSaga } from './orders';

export function* watchAuth() {
  yield all([]);
}

export function* watchOrders() {
  yield all([takeEvery(actionTypes.FETCH_ORDER_ITEMS, fetchOrderItemsSaga)]);
}
