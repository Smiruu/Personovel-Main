import axios from 'axios';
import {
  AUTHOR_LIST_REQUEST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_FAIL,
  AUTHOR_CREATE_REQUEST,
  AUTHOR_CREATE_SUCCESS,
  AUTHOR_CREATE_FAIL,
  AUTHOR_CREATE_RESET,
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

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

