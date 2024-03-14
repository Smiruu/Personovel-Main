import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants/searchConstants';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
  });
  
  export const searchRequest = (searchData) => ({
    type: SEARCH_REQUEST,
    payload: searchData,
  });
  
  export const searchSuccess = (results) => ({
    type: SEARCH_SUCCESS,
    payload: results,
  });
  
  export const searchFailure = (error) => ({
    type: SEARCH_FAILURE,
    payload: error,
  });
  
  export const searchBooks = (searchData) => {
    return async (dispatch) => {
      dispatch(searchRequest(searchData));
      try {
        const response = await instance.post('/api/search/', searchData);
        dispatch(searchSuccess(response.data));
      } catch (error) {
        dispatch(searchFailure(error.message));
      }
    };
  };