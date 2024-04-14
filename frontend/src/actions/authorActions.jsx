import axios from 'axios';
import {
  AUTHOR_LIST_REQUEST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_FAIL,
  AUTHOR_CREATE_REQUEST,
  AUTHOR_CREATE_SUCCESS,
  AUTHOR_CREATE_FAIL,
  AUTHOR_CREATE_RESET,
  AUTHOR_UPDATE_REQUEST,
  AUTHOR_UPDATE_SUCCESS,
  AUTHOR_UPDATE_FAIL,
  AUTHOR_UPDATE_RESET,
  AUTHOR_DELETE_REQUEST,
  AUTHOR_DELETE_SUCCESS,
  AUTHOR_DELETE_FAIL,
  AUTHOR_DELETE_RESET,
} from "../constants/authorConstants";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const listAuthors = () => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_LIST_REQUEST });

    const { data } = await instance.get('api/authors/');
    dispatch({
      type: AUTHOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createAuthor = (authorData) => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_CREATE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const { data } = await instance.post('api/authors/', authorData, config);

    dispatch({
      type: AUTHOR_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetAuthorCreation = () => (dispatch) => {
  dispatch({ type: AUTHOR_CREATE_RESET });
};

export const updateAuthor = (id, updatedAuthorData) => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_UPDATE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const { data } = await instance.put(
      `api/authors/${id}/update`,
      updatedAuthorData,
      config
    );

    dispatch({
      type: AUTHOR_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetAuthorUpdate = () => (dispatch) => {
  dispatch({ type: AUTHOR_UPDATE_RESET });
};

export const deleteAuthor = (id) => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_DELETE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token.access : null;
    
        const config = token ? {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        } : {};

    await instance.delete(`api/authors/${id}/delete`, config);

    dispatch({ type: AUTHOR_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: AUTHOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetDeleteAuthor = () => (dispatch) => {
  dispatch({ type: AUTHOR_DELETE_RESET });
};
