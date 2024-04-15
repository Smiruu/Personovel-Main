import * as types from '../constants/preferenceConstants';
import * as actionTypes from '../constants/preferenceConstants';
const initialState = {
  loading: false,
  error: null,
  preferredGenre: '',
  booksInRecommendedBooks: [],
  genres: [],
  genre: null,
  genre_books: [],
  prefGenres: [],
};

const preferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_READING_HISTORY_REQUEST:
    case types.GET_RECOMMENDED_BOOKS_REQUEST:
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
    case types.GET_RECOMMENDED_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_RECOMMENDED_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        preferredGenre: action.payload.preferredGenre,
        booksInRecommendedBooks: action.payload.books,
      };
    default:
      return state;
  }
};

export default preferenceReducer;

export const setPrefferedreducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PREFERRED_GENRE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.SET_PREFERRED_GENRE_SUCCESS:
      return { ...state, loading: false, error: null };
    case types.SET_PREFERRED_GENRE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const preferredGenresReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PREFERRED_GENRES_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case actionTypes.GET_PREFERRED_GENRES_SUCCESS:
      return {
        ...state,
        loading: false,
        prefGenres: action.payload,
      };
    case actionTypes.GET_PREFERRED_GENRES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const randomBooksReducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.GET_RANDOM_BOOKS_REQUEST:
          return {
              ...state,
              loading: true,
              error: null
          };
      case actionTypes.GET_RANDOM_BOOKS_SUCCESS:
          return {
              ...state,
              loading: false,
              genre: action.payload.genre,
              genre_books: action.payload.genre_books
          };
      case actionTypes.GET_RANDOM_BOOKS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload
          };
      default:
          return state;
  }
};