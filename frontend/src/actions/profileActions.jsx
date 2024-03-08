// profileActions.jsx
import axios from 'axios';
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILURE, UPDATE_USER_DETAILS } from '../constants/profileConstants';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const fetchUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await instance.get(`api/user/profile/${id}`);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:  
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};

export const updateUserDetails = (updatedData) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.put('api/update-profile/', updatedData, config);

    dispatch({
      type: UPDATE_USER_DETAILS,
      payload: data,
    });

  } catch (error) {
    // Handle error
    console.error(error);
  }
};
