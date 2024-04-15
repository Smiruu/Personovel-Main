import {
  USER_FEEDBACK_REQUEST,
  USER_FEEDBACK_SUCCESS,
  USER_FEEDBACK_FAIL,
  USER_FEEDBACK_RESET,
  USER_FEEDBACK_LIST_REQUEST,
  USER_FEEDBACK_LIST_SUCCESS,
  USER_FEEDBACK_LIST_FAIL,
  USER_FEEDBACK_DELETE_REQUEST,
  USER_FEEDBACK_DELETE_SUCCESS,
  USER_FEEDBACK_DELETE_FAIL,
  USER_FEEDBACK_DELETE_RESET,
} from "../constants/feedbackConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FEEDBACK_REQUEST:
      return { ...state, loading: true };
    case USER_FEEDBACK_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case USER_FEEDBACK_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_FEEDBACK_RESET:
      return initialState;
    default:
      return state;
  }
};

export const feedbackListReducer = (state = { feedbacks: [] }, action) => {
  switch (action.type) {
    case USER_FEEDBACK_LIST_REQUEST:
      return { loading: true, feedbacks: [] };
    case USER_FEEDBACK_LIST_SUCCESS:
      return { loading: false, feedbacks: action.payload };
    case USER_FEEDBACK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const feedbackDeleteReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_FEEDBACK_DELETE_REQUEST:
      return { loading: true };
    case USER_FEEDBACK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_FEEDBACK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_FEEDBACK_DELETE_RESET:
      return { success: false };
    default:
      return state;
  }
};
