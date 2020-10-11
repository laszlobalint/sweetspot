import { put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import * as actions from '../actions';
import axios from '../../client/axios-client';

const URL = `api/orders/`;

export function* fetchOrdersAdminSaga(action) {
  yield put(actions.fetchOrdersAdminInitialized());
  try {
    const response = yield axios.get(`${URL}`);
    yield put(actions.fetchOrdersAdminSuccess(response.data));
    toastr.success('SIKERES RENDELÉSBETÖLTÉS!', 'A korábban feladott rendelések betöltődtek.');
  } catch (error) {
    yield put(actions.fetchOrdersAdminFailure(error.message));
    toastr.error('HIBA LÉPETT FEL!', 'Nem sikerült a korábbi rendeléseket betölteni. Próbáld újra.');
  }
}
