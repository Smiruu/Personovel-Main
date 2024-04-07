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

const initialState = {
    loading: false,
    error: null,
    comments: [],
    comment: null // Adding this to store the created comment
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
                comments: action.payload,
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
        return {
          ...state,
          loading: false,
          reply: action.payload,
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