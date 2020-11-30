import { put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import * as actions from '../actions';
import axios from '../../client/axios-client';
import i18n from '../../shared/i18n';

const URL = `api/auth/`;

export function* authenticateSaga(action) {
  yield put(actions.authenticateInitialized());
  try {
    const response = yield axios.post(`${URL}login`, { username: action.username, password: action.password });
    yield localStorage.setItem('token', response.data.accessToken);
    yield put(actions.authenticateSuccess(response.data.accessToken));
    toastr.success(i18n.t('login-success'), i18n.t('login-info'));
  } catch (error) {
    yield put(actions.authenticateFailure(error.message));
    toastr.error(i18n.t('error'), i18n.t('error-login'));
  }
}

export function* authenticateLogoutSaga(action) {
  try {
    yield axios.post(`${URL}logout`);
    yield call([localStorage, localStorage.clear('token')]);
    toastr.message(i18n.t('logout-success'), i18n.t('come-back'));
  } catch (error) {
    yield call([localStorage, localStorage.clear('token')]);
  }
}
