// ratingReducer.js

import * as types from '../constants/ratingConstants';

const initialState = {
  rating: null, // Change ratings to rating
  loading: false,
  error: null,
  ratingId: null,
};

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RATINGS_REQUEST:
    case types.CREATE_RATING_REQUEST:
    case types.UPDATE_RATING_REQUEST:
    case types.DELETE_RATING_REQUEST:
    case types.GET_RATING_ID_REQUEST:
    case types.FETCH_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_RATINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        ratings: action.payload, // Change to rating
      };
    case types.CREATE_RATING_SUCCESS:
    case types.UPDATE_RATING_SUCCESS:
    case types.DELETE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.FETCH_RATINGS_FAILURE:
    case types.CREATE_RATING_FAILURE:
    case types.UPDATE_RATING_FAILURE:
    case types.DELETE_RATING_FAILURE:
    case types.GET_RATING_ID_FAILURE:
    case types.FETCH_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_RATING_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        ratingId: action.payload,
      };
    case types.FETCH_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        rating: action.payload, // Set the rating object
      };
    default:
      return state;
  }
};

export default ratingReducer;
