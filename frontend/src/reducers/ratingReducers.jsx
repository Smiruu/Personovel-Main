import * as types from "../constants/ratingConstants";

const initialState = {
  rating: null,
  loading: false,
  error: null,
  ratingId: null,
  ratings: {
    meanRating: null,
    numReviews: null,
  },
  userRating: null,
};

export const fetchMeanRatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RATINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_RATINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        ratings: {
          ...state.ratings,
          meanRating: action.payload.meanRating,
          numReviews: action.payload.numReviews,
        },
      };
    case types.FETCH_RATINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.CREATE_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,

        ratingId: null,
      };
    case types.DELETE_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getRatingIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RATING_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_RATING_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        ratingId: action.payload,
      };
    case types.GET_RATING_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const fetchRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        userRating: action.payload.rating,
      };
    case types.FETCH_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
