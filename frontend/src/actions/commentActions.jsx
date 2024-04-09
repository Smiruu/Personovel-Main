// actions/commentActions.js

import axios from 'axios';
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAIL,
  GET_USER_COMMENTS_AND_REPLIES_REQUEST,
  GET_USER_COMMENTS_AND_REPLIES_SUCCESS,
  GET_USER_COMMENTS_AND_REPLIES_FAILURE,
} from '../constants/commentConstants';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const createComment = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const response = await instance.post('/api/comments/create/', commentData, config);

    const data = await response.data;

    if (!response.ok) {
      dispatch({ type: CREATE_COMMENT_FAILURE, payload: data });
    } else {
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error.message });
  }
};

export const getCommentsForBook = (bookId) => async (dispatch) => {
  console.log("GET_COMMENTS_REQUEST dispatched"); // Log dispatch
  dispatch({ type: GET_COMMENTS_REQUEST });
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const { data } = await instance.get(`/api/comments/book/${bookId}/`, config);
    console.log("Received comments data:", data); // Log received data
    dispatch({ type: GET_COMMENTS_SUCCESS, payload: data });
    console.log("GET_COMMENTS_SUCCESS dispatched"); // Log success dispatch
  } catch (error) {
    dispatch({ type: GET_COMMENTS_FAILURE, payload: error.message });
  }
};

export const createReply = (comment_id, reply, user_id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REPLY_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const { data } = await instance.post(`/api/replies/create/`, { comment_id, reply, user_id }, config);

    dispatch({
      type: CREATE_REPLY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CREATE_REPLY_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};

export const getUserCommentsAndReplies = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_COMMENTS_AND_REPLIES_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const { data } = await instance.get(`/api/users/${userId}/comments-and-replies/`, config);

    dispatch({ type: GET_USER_COMMENTS_AND_REPLIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_COMMENTS_AND_REPLIES_FAILURE, payload: error.message });
  }
};