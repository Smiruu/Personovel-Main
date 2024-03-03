import { INTERACTION_LIST_FAIL, INTERACTION_LIST_REQUEST, INTERACTION_LIST_SUCCESS, INTERACTION_DETAILS_FAIL, INTERACTION_DETAILS_REQUEST, INTERACTION_DETAILS_SUCCESS } from "../constants/interactionConstants";
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const listInteractions = () => async (dispatch) => {
  try {
    dispatch({ type: INTERACTION_LIST_REQUEST });
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const { data } = await instance.get('api/interactions/', config);
    const updatedData = data.map(interaction => ({
      ...interaction,
    }));

    dispatch({
      type: INTERACTION_LIST_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const listInteractionDetails = (id) => async (dispatch) => {
  try {
    // Dispatch action to indicate the start of the request
    dispatch({ type: INTERACTION_DETAILS_REQUEST });

    // Check if ID is valid
    if (!id && id !== 0) {
      throw new Error('Invalid Interaction ID');
    }

    // Get user token from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    // Configure Axios request headers with token
    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      }
    };

    // Make GET request to fetch interaction details
    const { data } = await instance.get(`/api/interactions/${id}`, config);

    // Dispatch action with fetched data
    dispatch({
      type: INTERACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch action with error message
    dispatch({
      type: INTERACTION_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};