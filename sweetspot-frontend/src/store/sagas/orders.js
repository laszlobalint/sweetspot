import { put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import axios from '../../client/axios-client';
import * as actions from '../actions';
import i18n from '../../shared/i18n';

const URL_ITEMS = `api/items`;
const URL_ORDERS = `api/orders`;

export function* fetchOrderItemsSaga(action) {
  yield put(actions.fetchOrderItemsInitialized());
  try {
    const response = yield axios.get(URL_ITEMS);
    yield put(actions.fetchOrderItemsSuccess(response.data));
    toastr.message(i18n.t('order-steps'), i18n.t('order-steps-details'), {
      timeOut: 15000,
      attention: true,
    });
  } catch (error) {
    yield put(actions.fetchOrderItemsFailure(error));
  }
}

export function* saveOrderSaga(action) {
  yield put(actions.saveOrderInitialized());
  try {
    const response = yield axios.post(URL_ORDERS, action.order);
    yield put(actions.saveOrderSuccess(response.data));
    toastr.success(i18n.t('order-success'), i18n.t('order-success-details'), {
      timeOut: 10000,
    });
  } catch (error) {
    yield put(actions.saveOrderFailure(error));
    toastr.error(i18n.t('error'), i18n.t('error-order'), {
      timeOut: 10000,
    });
  }
}
