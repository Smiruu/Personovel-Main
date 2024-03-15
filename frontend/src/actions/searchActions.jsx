import * as actionTypes from '../constants/searchConstants';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});
  
export const searchBooks = (query) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.SEARCH_REQUEST });

        console.log('Query Parameters:', query);
  
        // Serialize the query object into URL parameters
        const params = new URLSearchParams();
        for (const key in query) {
            params.append(key, query[key]);
        }

        // Perform API call to search for books
        const response = await instance.get('search/', { params });
        const data = response.data; // axios already parses JSON response
  
        dispatch({
            type: actionTypes.SEARCH_SUCCESS,
            payload: data.books, // Assuming the response contains a 'books' key with an array of books
        });
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH_FAIL,
            payload: error.message,
        });
    }
};
