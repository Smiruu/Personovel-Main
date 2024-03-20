import {
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_DETAILS_REQUEST,
  GENRE_DETAILS_SUCCESS,
  GENRE_DETAILS_FAIL,
} from "../constants/genreConstants";

export const genreListReducer = (state = { genres: [] }, action) => {
  switch (action.type) {
    case GENRE_LIST_REQUEST:
      return { loading: true, genres: [] };
    case GENRE_LIST_SUCCESS:
      return { loading: false, genres: action.payload };
    case GENRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const genreDetailsReducer = (
  state = { genre: { books: [] } },
  action
) => {
  switch (action.type) {
    case GENRE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case GENRE_DETAILS_SUCCESS:
      return { loading: false, genre: action.payload };
    case GENRE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
