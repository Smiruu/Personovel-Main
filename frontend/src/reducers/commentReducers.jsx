// reducers/commentReducers.js

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
  GET_REPLIES_REQUEST,
  GET_REPLIES_SUCCESS,
  GET_REPLIES_FAIL,
  GET_USER_COMMENTS_AND_REPLIES_REQUEST,
  GET_USER_COMMENTS_AND_REPLIES_SUCCESS,
  GET_USER_COMMENTS_AND_REPLIES_FAILURE,
} from '../constants/commentConstants';

const initialState = {
  loading: false,
  error: null,
  comments: [],
  comment: null,
  replies: {}
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.payload,
        error: null
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null
      };
    case CREATE_COMMENT_FAILURE:
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const createReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_REPLY_SUCCESS:
      const { comment_id, reply } = action.payload;
      const updatedComments = state.comments.map(comment => {
        if (comment.id === comment_id) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      });
      return {
        ...state,
        loading: false,
        comments: updatedComments,
        error: null
      };
    case CREATE_REPLY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const getRepliesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPLIES_REQUEST:
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.commentId]: {
            loading: true,
            error: null,
            data: []
          }
        }
      };
    case GET_REPLIES_SUCCESS:
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.commentId]: {
            loading: false,
            error: null,
            data: action.payload
          }
        }
      };
    case GET_REPLIES_FAIL:
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.commentId]: {
            loading: false,
            error: action.payload,
            data: []
          }
        }
      };
    default:
      return state;
  }
};

export const CommentandReplyUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COMMENTS_AND_REPLIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_COMMENTS_AND_REPLIES_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload.comments,
        replies: action.payload.replies,
        error: null,
      };
    case GET_USER_COMMENTS_AND_REPLIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};