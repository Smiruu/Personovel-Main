import axios from 'axios';
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from '../constants/profileConstants'


const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});
export const getUserDetails = () => async (dispatch, getState) => {
  try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const {
          userLogin: { userInfo },
      } = getState();

      if (!userInfo || !userInfo.token) {
          throw new Error('User information is missing or incomplete');
      }

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token.access}`,
          },
      };

    //   console.log('Access Token:', userInfo.token.access);
      const { data } = await axios.get('api/user/profile/', config);
      console.log('Response Data:', data);

      dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: USER_DETAILS_FAIL,
          payload: error.response
              ? error.response.data.message
              : error.message || 'Error fetching user details',
      });
  }
};

export const resetUpdateProfile = () => (dispatch) => {
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
};

export const updateUserProfile = (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  
      const { userLogin: { userInfo } } = getState();
  
      if (!userInfo || !userInfo.token) {
        throw new Error('User information is missing or incomplete');
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token.access}`,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const { data } = await axios.put('api/user/profile/update/', formData, config);
  
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data.profile_data,
      });
  
      // Refetch user details after updating profile
      dispatch(getUserDetails());
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: error.response
          ? error.response.data.message
          : error.message || 'Error updating user profile',
      });
    }
  };