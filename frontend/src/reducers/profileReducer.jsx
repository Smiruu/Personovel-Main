import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAIL,
  } from '../constants/profileConstants';
  
  export const profileReducer = (state = { profileInfo: null, loading: false, error: null }, action) => {
    switch (action.type) {
      case PROFILE_REQUEST:
        return { ...state, loading: true };
      case PROFILE_SUCCESS:
        return { ...state, loading: false, profileInfo: action.payload };
      case PROFILE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };