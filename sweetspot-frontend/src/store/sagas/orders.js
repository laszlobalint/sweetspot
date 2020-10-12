import { put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import axios from '../../client/axios-client';
import * as actions from '../actions';

const URL_ITEMS = `api/items`;
const URL_ORDERS = `api/orders`;

export function* fetchOrderItemsSaga(action) {
  yield put(actions.fetchOrderItemsInitialized());
  try {
    const response = yield axios.get(URL_ITEMS);
    yield put(actions.fetchOrderItemsSuccess(response.data));
    toastr.message(
      'RENDELÉS MENETE',
      'Tegye a termékeket a kosárba (a megadott mennyiségben), majd kattinton a fenti "Rendelés" menüpontra a folytatáshoz. Kellemes válogatást!',
      {
        timeOut: 15000,
        attention: true,
      },
    );
  } catch (error) {
    yield put(actions.fetchOrderItemsFailure(error));
  }
}

export function* saveOrderSaga(action) {
  yield put(actions.saveOrderInitialized());
  try {
    const response = yield axios.post(URL_ORDERS, action.order);
    yield put(actions.saveOrderSuccess(response.data));
    toastr.success('SIKERES RENDELÉS!', 'Köszönjük! Kérjük, ellenőrizze a megadott e-mail fiókjába érkezett rendelésösszesítőt.', {
      timeOut: 8000,
    });
  } catch (error) {
    yield put(actions.saveOrderFailure(error));
    toastr.error('HIBA LÉPETT FEL!', 'A rendelés során hiba merült fel. Kérjük, próbálja újra vagy vegye fel a kapcsolatot velünk.', {
      timeOut: 8000,
    });
  }
}
