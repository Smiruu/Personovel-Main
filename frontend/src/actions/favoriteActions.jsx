// actions.js
import axios from 'axios';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FETCH_FAVORITES_SUCCESS,
} from '../constants/favoriteConstants';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const addToFavorites = (userId, bookId) => async (dispatch) => {
  try {
    await axios.post(`/api/${userId}/add-to-favorites/${bookId}/`);
    dispatch({ type: ADD_TO_FAVORITES, payload: { userId, bookId } });
    // Fetch updated favorites after adding a book to favorites
    dispatch(fetchFavorites(userId));
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (userId, bookId) => async (dispatch) => {
  try {
    await axios.delete(`/api/${userId}/remove-from-favorites/${bookId}/`);
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: { userId, bookId } });
    // Fetch updated favorites after removing a book from favorites
    dispatch(fetchFavorites(userId));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const fetchFavorites = (userId) => async (dispatch) => {
    try {
      const response = await axios.get(`/api/${userId}/favorites/`);
      dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: response.data });
      console.log('Favorites payload:', response.data); // Log the payload
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };
  