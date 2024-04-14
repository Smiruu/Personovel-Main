// reducers/favoriteReducer.js

import {
    ADD_TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    FETCH_FAVORITES_SUCCESS,
  } from '../constants/favoriteConstants';
  
  const initialState = {
    favoriteBooks: [], // Ensure that favoriteBooks is initialized as an empty array
  };
  
  const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_FAVORITES:
        // Update state when adding to favorites
        return {
          ...state,
          favoriteBooks: [...state.favoriteBooks, action.payload.bookId],
        };
      case REMOVE_FROM_FAVORITES:
        // Update state when removing from favorites
        return {
          ...state,
          favoriteBooks: state.favoriteBooks.filter(
            (id) => id !== action.payload.bookId
          ),
        };
      case FETCH_FAVORITES_SUCCESS:
        // Update state when fetching favorites
        return {
          ...state,
          favoriteBooks: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default favoriteReducer;
  