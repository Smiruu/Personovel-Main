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
    CREATE_REPLY_FAIL
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

        const response = await fetch('/api/comments/create/', {
            method: 'POST',
            headers: {
                ...config.headers, // Merge with existing headers
            },
            body: JSON.stringify(commentData)
        });

        const data = await response.json();

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
  
      // Assuming 'data' is an array of comments, you can map through it to create updatedData
      const updatedData = data.map(comment => ({
        ...comment,
      }));
      
      console.log("Received comments data:", updatedData); // Log the updated data
      
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: updatedData });
  
      console.log("GET_COMMENTS_SUCCESS dispatched successfully."); // Log success dispatch
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

    const { data } = await axios.post(`/api/replies/create/`, { comment_id, reply, user_id}, config);

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