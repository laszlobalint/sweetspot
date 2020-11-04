import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/action-types';
import { fetchOrdersAdminSaga, saveNewItemImageSaga, saveNewItemSaga } from './admin';
import { authenticateSaga, authenticateLogoutSaga } from './auth';
import { fetchOrderItemsSaga, saveOrderSaga } from './orders';

export function* watchAdmin() {
  yield all([
    takeEvery(actionTypes.FETCH_ORDERS_ADMIN, fetchOrdersAdminSaga),
    takeEvery(actionTypes.SAVE_ITEM_IMAGE, saveNewItemImageSaga),
    takeLatest(actionTypes.SAVE_NEW_ITEM, saveNewItemSaga),
  ]);
}

export function* watchAuth() {
  yield all([takeEvery(actionTypes.AUTHENTICATE, authenticateSaga), takeEvery(actionTypes.AUTHENTICATE_LOGOUT, authenticateLogoutSaga)]);
}

export function* watchOrders() {
  yield all([takeEvery(actionTypes.FETCH_ORDER_ITEMS, fetchOrderItemsSaga), takeLatest(actionTypes.SAVE_ORDER, saveOrderSaga)]);
}
