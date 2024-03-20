import { BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL, BOOK_DETAILS_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS } from "../constants/bookConstants";
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });
  

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access: null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': `Bearer ${token}` // Fix the template literal syntax
      }
    } : {};

    const { data } = await instance.get('api/books/', config);
    const updatedData = data.map(book => ({
        ...book,
        image: `${instance.defaults.baseURL}${book.image}` // Assuming image is stored as a relative path
      }));

    // Update the image path for each book
   
    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const listBookDetails = (_id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST });
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access: null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': `Bearer ${token}` // Fix the template literal syntax
      }
    } : {};

    const { data } = await instance.get(`/api/books/${_id}`, config);
    const updatedData = {
      ...data,
      image: `${instance.defaults.baseURL}${data.image}` // Assuming image is stored as a relative path
    };

    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};