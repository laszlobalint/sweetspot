import { put } from 'redux-saga/effects';

import axios from '../../client/axios-client';
import * as actions from '../actions';

const URL = `api/items`;

export function* fetchOrderItemsSaga(action) {
  yield put(actions.fetchOrderItemsInitialized());
  try {
    const response = yield axios.get(URL);
    yield put(actions.fetchOrderItemsSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchOrderItemsFailure(error));
  }
}
