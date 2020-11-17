import { put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import * as actions from '../actions';
import axios from '../../client/axios-client';
import history from '../../client/history';
import i18n from '../../shared/i18n';

const URL_ITEMS = `api/items`;
const URL_ORDERS = `api/orders`;

export function* fetchOrdersAdminSaga(action) {
  yield put(actions.fetchOrdersAdminInitialized());
  try {
    const response = yield axios.get(`${URL_ORDERS}`);
    yield put(actions.fetchOrdersAdminSuccess(response.data));
    toastr.success(i18n.t('fetch-success'), i18n.t('fetch-success-details'));
  } catch (error) {
    yield put(actions.fetchOrdersAdminFailure(error.message));
    toastr.error(i18n.t('error'), i18n.t('error-fetch'));
  }
}

export function* saveNewItemImageSaga(action) {
  yield put(actions.saveItemImageInitialized());
  try {
    const response = yield axios.post(`${URL_ITEMS}/upload`, action.file);
    yield put(actions.saveItemImageSuccess(response.data));
    toastr.success(i18n.t('picture-upload-success'), i18n.t('picture-upload-success-details'));
  } catch (error) {
    yield put(actions.saveItemImageFailure(error.message));
    toastr.error(i18n.t('error'), i18n.t('error-picture'));
  }
}

export function* saveNewItemSaga(action) {
  yield put(actions.saveNewItemInitialized());
  try {
    const response = yield axios.post(`${URL_ITEMS}`, action.item);
    yield put(actions.saveNewItemSuccess(response.data));
    toastr.success(i18n.t('upload-success'), i18n.t('success-details'));
    setTimeout(() => {
      history.push('/');
      history.go(0);
    }, 3000);
  } catch (error) {
    yield put(actions.saveNewItemFailure(error.message));
    toastr.error(i18n.t('error'), i18n.t('error-upload'));
  }
}

export function* editItemSaga(action) {
  yield put(actions.editItemInitialized());
  try {
    const response = yield axios.put(`${URL_ITEMS}/${action.item.id}`, action.item);
    yield put(actions.editItemSuccess(response.data));
    toastr.success(i18n.t('edit-success'), i18n.t('success-details'));
    setTimeout(() => {
      history.push('/');
      history.go(0);
    }, 3000);
  } catch (error) {
    yield put(actions.editItemFailure(error.message));
    toastr.error(i18n.t('error'), i18n.t('error-edit'));
  }
}

export function* deleteItemSaga(action) {
  yield put(actions.deleteItemInitialized());
  try {
    const response = yield axios.delete(`${URL_ITEMS}/${action.id}`);
    yield put(actions.deleteItemSuccess(response.data));
    toastr.success(i18n.t('delete-success'), i18n.t('success-details'));
    setTimeout(() => {
      history.push('/');
      history.go(0);
    }, 3000);
  } catch (error) {
    yield put(actions.deleteItemFailure(error.message));
    toastr.error(i18n.t('error'), i18n.t('error-delete'));
  }
}
