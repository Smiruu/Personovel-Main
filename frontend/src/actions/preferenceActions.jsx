import * as actionTypes from '../constants/preferenceConstants';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export const addToReadingHistory = (bookId, userId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.ADD_TO_READING_HISTORY_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token.access : null;
    
        const config = token ? {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        } : {};
  
        
        // Perform API call to add the book to reading history
        await instance.post('add_to_reading_history/', { book_id: bookId, user_id: userId, config });

        dispatch({ type: actionTypes.ADD_TO_READING_HISTORY_SUCCESS });
    } catch (error) {
        dispatch({
            type: actionTypes.ADD_TO_READING_HISTORY_FAILURE,
            payload: error.message,
        });
    }
};

export const getPreferredGenre = (userId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PREFERRED_GENRE_REQUEST });
        
        // Perform API call to get the preferred genre for the user
        const response = await instance.get(`get_preferred_genre/${userId}`, { data: { user_id: userId } });
        console.log("Response", response.data); // Log the entire response data
        
        const books = response.data; // Since preferredGenre is not available, we only extract books
        
        dispatch({
            type: actionTypes.GET_PREFERRED_GENRE_SUCCESS,
            payload: { preferredGenre: null, books }, // Set preferredGenre as null or any default value
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PREFERRED_GENRE_FAILURE,
            payload: error.message,
        });
    }
};
