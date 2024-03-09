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
    dispatch({ type: INTERACTION_DETAILS_REQUEST });

    if (!id && id !== 0) {
      throw new Error('Invalid Interaction ID');
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    } : {};

    const { data } = await instance.get(`/api/interactions/${id}`, config);
    const updatedData = {
      ...data,
    };

    dispatch({
      type: INTERACTION_DETAILS_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};
  