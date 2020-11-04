import { put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import * as actions from '../actions';
import axios from '../../client/axios-client';

const URL_ITEMS = `api/items`;
const URL_ORDERS = `api/orders`;

export function* fetchOrdersAdminSaga(action) {
  yield put(actions.fetchOrdersAdminInitialized());
  try {
    const response = yield axios.get(`${URL_ORDERS}`);
    yield put(actions.fetchOrdersAdminSuccess(response.data));
    toastr.success('SIKERES RENDELÉSBETÖLTÉS!', 'A korábban feladott rendelések betöltődtek.');
  } catch (error) {
    yield put(actions.fetchOrdersAdminFailure(error.message));
    toastr.error('HIBA LÉPETT FEL!', 'Nem sikerült a korábbi rendeléseket betölteni. Próbáld újra.');
  }
}

export function* saveNewItemImageSaga(action) {
  yield put(actions.saveItemImageInitialized());
  try {
    const response = yield axios.post(`${URL_ITEMS}/upload`, action.file);
    yield put(actions.saveItemImageSuccess(response.data));
    toastr.success('SIKERES KÉPFELTÖLTÉS!', 'Folytathatod az új termék felvitelét.');
  } catch (error) {
    yield put(actions.saveItemImageFailure(error.message));
    toastr.error('HIBA LÉPETT FEL!', 'Nem sikerült a képet elmenteni. Próbáld újra.');
  }
}

export function* saveNewItemSaga(action) {
  yield put(actions.saveNewItemInitialized());
  try {
    const response = yield axios.post(`${URL_ITEMS}`, action.item);
    console.log(response.data);
    yield put(actions.saveNewItemSuccess(response.data));
    toastr.success('SIKERES TERMÉKFELTÖLTÉS!', 'Ellenőrizd le a terméklistát.');
  } catch (error) {
    yield put(actions.saveNewItemFailure(error.message));
    toastr.error('HIBA LÉPETT FEL!', 'Nem sikerült a termékfeltöltés. Próbáld újra.');
  }
}
