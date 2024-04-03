import * as types from '../constants/preferenceConstants';

const initialState = {
  loading: false,
  error: null,
  preferredGenre: '',
  booksInPreferredGenre: [],
};

const preferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_READING_HISTORY_REQUEST:
    case types.GET_PREFERRED_GENRE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_TO_READING_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_TO_READING_HISTORY_FAILURE:
    case types.GET_PREFERRED_GENRE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_PREFERRED_GENRE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        preferredGenre: action.payload.preferredGenre,
        booksInPreferredGenre: action.payload.books,
      };
    default:
      return state;
  }
};

export default preferenceReducer;