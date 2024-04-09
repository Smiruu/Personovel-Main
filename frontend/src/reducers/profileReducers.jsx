// profileReducers.js

import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  GET_USER_PROFILE_BY_ID_REQUEST,
  GET_USER_PROFILE_BY_ID_SUCCESS,
  GET_USER_PROFILE_BY_ID_FAIL,
  LATEST_USER_READING_HISTORY_REQUEST,
  LATEST_USER_READING_HISTORY_SUCCESS,
  LATEST_USER_READING_HISTORY_FAIL
} from '../constants/profileConstants';

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userProfileByIdReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_BY_ID_REQUEST:
      return { loading: true, profile: {} };
    case GET_USER_PROFILE_BY_ID_SUCCESS:
      return { loading: false, profile: action.payload };
    case GET_USER_PROFILE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const latestUserReadingHistoryReducer = (state = { history: [] }, action) => {
  switch (action.type) {
    case LATEST_USER_READING_HISTORY_REQUEST:
      return { loading: true, history: [] };
    case LATEST_USER_READING_HISTORY_SUCCESS:
      return { loading: false, history: action.payload };
    case LATEST_USER_READING_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};