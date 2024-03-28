import axios from 'axios';
import * as types from '../constants/ratingConstants';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Update with your backend API base URL
});


export const fetchMeanRatings = (bookid) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_RATINGS_REQUEST });

    const { data } = await instance.get(`api/ratings/book/${bookid}`);
    const meanRating = data.average_rating;
    const numReviews = data.num_reviews;
    const payload = { meanRating, numReviews }; // Combine meanRating and numReviews into a single payload object
    dispatch({ type: types.FETCH_RATINGS_SUCCESS, payload });
  } catch (error) {
    dispatch({
      type: types.FETCH_RATINGS_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const createRating = (ratingData) => async (dispatch) => {
    try {
      dispatch({ type: types.CREATE_RATING_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo ? userInfo.token.access : null;
  
      const config = token ? {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      } : {};
  
      const response = await instance.post('api/ratings/create/', ratingData, config);
      console.log('Response Data:', response.data); // Log response data
       // Log the result of setting local storage
       
      dispatch({ type: types.CREATE_RATING_SUCCESS, payload: response.data });
    } catch (error) {
      localStorage.setItem('createRatingError', error.Message);
      dispatch({
        type: types.CREATE_RATING_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
};

export const updateRating = (ratingId, ratingData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_RATING_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access: null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': `Bearer ${token}` // Fix the template literal syntax
      }
    } : {};

    const { data } = await instance.put(`api/ratings/${ratingId}/update/`, ratingData, config);
    dispatch({ type: types.UPDATE_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.UPDATE_RATING_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteRating = (ratingId) => async (dispatch) => {
    try {
      dispatch({ type: types.DELETE_RATING_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo ? userInfo.token.access: null;
  
      const config = token ? {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
          'Authorization': `Bearer ${token}` // Fix the template literal syntax
        }
      } : {};
      
      await instance.delete(`api/ratings/${ratingId}/delete/`, config); // Pass config to include headers
      dispatch({ type: types.DELETE_RATING_SUCCESS, payload: ratingId });
    } catch (error) {
      dispatch({
        type: types.DELETE_RATING_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const getRatingId = (userId, bookId) => async (dispatch) => {
    try {
      dispatch({ type: types.GET_RATING_ID_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo ? userInfo.token.access : null;
  
      const config = token ? {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      } : {};
  
      const response = await instance.get(`api/ratings/${userId}/${bookId}/get-rating-id/`, config);
      const ratingId = response.data.rating_id; // Extract rating_id from the response

      localStorage.setItem("ratingId", ratingId)
      dispatch({ type: types.GET_RATING_ID_SUCCESS, payload: ratingId });
    } catch (error) {
      console.error("Error fetching rating ID:", error);
  
      dispatch({
        type: types.GET_RATING_ID_FAILURE,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }
  };
  
  
  export const retrieveRating = (ratingId) => async (dispatch) => {
    try {
      dispatch({ type: types.FETCH_RATING_REQUEST });
  
      // Make a GET request to retrieve the rating by ID
      const { data } = await instance.get(`api/ratings/${ratingId}/`);
  
      // Extract relevant fields from the data object to form the payload
      const payload = {
        rating: data.rating,
        created_at: data.created_at,
      };
      
      localStorage.setItem("userRating", payload.rating)
      // Dispatch success action with the payload
      dispatch({ type: types.FETCH_RATING_SUCCESS, payload });
  
      // Log the rating payload
      console.log("Rating Payload:", payload.rating);

    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: types.FETCH_RATING_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  