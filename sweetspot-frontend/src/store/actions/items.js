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

export const editItem = (item) => {
  return {
    type: actionTypes.EDIT_ITEM,
    item,
  };
};

export const editItemInitialized = () => {
  return {
    type: actionTypes.EDIT_ITEM_INITIZALITED,
  };
};

export const editItemSuccess = (item) => {
  return {
    type: actionTypes.EDIT_ITEM_SUCCESS,
    item,
  };
};

export const editItemFailure = (error) => {
  return {
    type: actionTypes.EDIT_ITEM_FAILURE,
    error,
  };
};

export const deleteItem = (id) => {
  return {
    type: actionTypes.DELETE_ITEM,
    id,
  };
};

export const deleteItemInitialized = () => {
  return {
    type: actionTypes.DELETE_ITEM_INITIALIZED,
  };
};

export const deleteItemSuccess = (id) => {
  return {
    type: actionTypes.DELETE_ITEM_SUCCESS,
    id,
  };
};

export const deletetItemFailure = (error) => {
  return {
    type: actionTypes.DELETE_ITEM_FAILURE,
    error,
  };
};
