import { put, call } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../client/axios-client';

const URL = `api/auth/`;

export function* authenticateSaga(action) {
  yield put(actions.authenticateInitialized());
  try {
    const response = yield axios.post(`${URL}login`, { username: action.username, password: action.password });
    yield localStorage.setItem('token', response.data.accessToken);
    yield put(actions.authenticateSuccess(response.data.accessToken));
  } catch (error) {
    yield put(actions.authenticateFailure(error.message));
  }
}

export function* authenticateLogoutSaga(action) {
  try {
    yield axios.post(`${URL}logout`, { username: action.username, password: action.password });
    yield call([localStorage, 'clear']);
  } catch (error) {
    yield call([localStorage, 'clear']);
  }
}
