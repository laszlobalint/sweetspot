import * as actionTypes from './action-types';

export const saveItemImage = (file) => {
  return {
    type: actionTypes.SAVE_ITEM_IMAGE,
    file,
  };
};

export const saveItemImageInitialized = () => {
  return {
    type: actionTypes.SAVE_ITEM_IMAGE_INITIZALITED,
  };
};

export const saveItemImageSuccess = (fileData) => {
  return {
    type: actionTypes.SAVE_ITEM_IMAGE_SUCCESS,
    fileData,
  };
};

export const saveItemImageFailure = (error) => {
  return {
    type: actionTypes.SAVE_ITEM_IMAGE_FAILURE,
    error,
  };
};

export const saveNewItem = (item) => {
  return {
    type: actionTypes.SAVE_NEW_ITEM,
    item,
  };
};

export const saveNewItemInitialized = () => {
  return {
    type: actionTypes.SAVE_NEW_ITEM_INITIZALITED,
  };
};

export const saveNewItemSuccess = (item) => {
  return {
    type: actionTypes.SAVE_NEW_ITEM_SUCCESS,
    item,
  };
};

export const saveNewItemFailure = (error) => {
  return {
    type: actionTypes.SAVE_NEW_ITEM_FAILURE,
    error,
  };
};
