import { put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import * as actions from '../actions';
import axios from '../../client/axios-client';
import history from '../../client/history';

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
    yield put(actions.saveNewItemSuccess(response.data));
    toastr.success('SIKERES TERMÉKFELTÖLTÉS!', 'Ellenőrizd le a terméklistát.');
    setTimeout(() => {
      history.push('/');
      history.go(0);
    }, 3000);
  } catch (error) {
    yield put(actions.saveNewItemFailure(error.message));
    toastr.error('HIBA LÉPETT FEL!', 'Nem sikerült a termékfeltöltés. Próbáld újra.');
  }
}

export function* editItemSaga(action) {
  yield put(actions.editItemInitialized());
  try {
    const response = yield axios.put(`${URL_ITEMS}/${action.item.id}`, action.item);
    yield put(actions.editItemSuccess(response.data));
    toastr.success('SIKERES TERMÉKMÓDOSÍTÁS!', 'Ellenőrizd le a terméklistát.');
    setTimeout(() => {
      history.push('/');
      history.go(0);
    }, 3000);
  } catch (error) {
    yield put(actions.editItemFailure(error.message));
    toastr.error('HIBA LÉPETT FEL!', 'Nem sikerült a termékmódosítás. Próbáld újra.');
  }
}

export function* deleteItemSaga(action) {
  yield put(actions.deleteItemInitialized());
  try {
    const response = yield axios.delete(`${URL_ITEMS}/${action.id}`);
    yield put(actions.deleteItemSuccess(response.data));
    toastr.success('SIKERES TERMÉKTÖRLÉS!', 'Ellenőrizd le a terméklistát.');
    setTimeout(() => {
      history.push('/');
      history.go(0);
    }, 3000);
  } catch (error) {
    yield put(actions.deleteItemFailure(error.message));
    toastr.error('HIBA LÉPETT FEL!', 'Nem sikerült a terméktörlés. Próbáld újra.');
  }
}
