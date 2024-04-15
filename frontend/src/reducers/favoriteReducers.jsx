import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FETCH_FAVORITES_SUCCESS,
} from "../constants/favoriteConstants";

const initialState = {
  favoriteBooks: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteBooks: [...state.favoriteBooks, action.payload.bookId],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteBooks: state.favoriteBooks.filter(
          (id) => id !== action.payload.bookId
        ),
      };
    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        favoriteBooks: action.payload,
      };
    default:
      return state;
  }
};

export default favoriteReducer;
