import {
  LOG_LIST_REQUEST,
  LOG_LIST_FAIL,
  LOG_LIST_SUCCESS,
  LOG_CREATE_REQUEST,
  LOG_CREATE_FAIL,
  LOG_CREATE_SUCCESS,
  LOG_CREATE_RESET,
} from "../constants/logConstants";

export const logListReducer = (state = { logs: [] }, action) => {
  switch (action.type) {
    case LOG_LIST_REQUEST:
      return { loading: true, logs: [] };
    case LOG_LIST_SUCCESS:
      return { loading: false, logs: action.payload };
    case LOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const logCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_CREATE_REQUEST:
      return { loading: true };
    case LOG_CREATE_SUCCESS:
      return { loading: false, success: true, log: action.payload };
    case LOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LOG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
