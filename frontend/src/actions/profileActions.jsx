import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  GET_USER_PROFILE_BY_ID_REQUEST,
  GET_USER_PROFILE_BY_ID_SUCCESS,
  GET_USER_PROFILE_BY_ID_FAIL,
  LATEST_USER_READING_HISTORY_REQUEST,
  LATEST_USER_READING_HISTORY_SUCCESS,
  LATEST_USER_READING_HISTORY_FAIL,
} from "../constants/profileConstants";

const instance = axios.create({
  baseURL: "https://dplsplsdeploy-be98d8b2fd29.herokuapp.com/",
});
export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error("User information is missing or incomplete");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token.access}`,
      },
    };

    const { data } = await instance.get("api/user/profile/", config);
    console.log("Response Data:", data);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response
        ? error.response.data.message
        : error.message || "Error fetching user details",
    });
  }
};

export const resetUpdateProfile = () => (dispatch) => {
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
};

export const updateUserProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error("User information is missing or incomplete");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token.access}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await instance.put(
      "api/user/profile/update/",
      formData,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.profile_data,
    });

    dispatch(getUserDetails());
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response
        ? error.response.data.message
        : error.message || "Error updating user profile",
    });
  }
};

export const getUserProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_BY_ID_REQUEST });

    const { data } = await instance.get(`/api/user/profiles/user/${userId}`);

    dispatch({
      type: GET_USER_PROFILE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getLatestUserReadingHistory = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LATEST_USER_READING_HISTORY_REQUEST });

    const { data } = await instance.get(`/api/reading-history/${userId}/`);

    dispatch({
      type: LATEST_USER_READING_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LATEST_USER_READING_HISTORY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
