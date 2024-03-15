// reducer.jsx

import * as actionTypes from '../constants/searchConstants';

const initialState = {
  loading: false,
  books: [],
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
        error: null,
      };
    case actionTypes.SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
