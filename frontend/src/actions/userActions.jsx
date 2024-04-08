import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PAID_REQUEST,
  USER_UPDATE_PAID_SUCCESS,
  USER_UPDATE_PAID_FAIL,
  CHECK_PAID_STATUS_FAILURE,
  CHECK_PAID_STATUS_SUCCESS,
  CHECK_PAID_STATUS_REQUEST
} from "../constants/userConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const { data } = await instance.post(
      "api/user/login/",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return true;
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.details
        ? error.response.data.details
        : error.message,
    });
    return false; // Return false if login fails
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  window.location.reload();
  localStorage.removeItem('userInfo');
};

export const updateUserToPaid = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PAID_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;
    console.log("token", token);
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    // Get the current date
    const currentDate = new Date().toISOString();

    // Make the API call to update user to paid
    await instance.put(`api/user/pay/${userId}/`, {}, config);

    // Update userInfo token is_paid to true and set paid_at date
    userInfo.token.is_paid = true;
    userInfo.token.paid_at = currentDate; // Update with current date
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    dispatch({ type: USER_UPDATE_PAID_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PAID_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const checkUserPaidStatus = (userId) => async (dispatch, getState) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token : null;
    console.log("token", token);
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        }
      : {};

    // Make the API call to check user's paid status
    const { data } = await instance.get(`api/user/check-paid-status/${userId}/`, config);

    // Dispatch action based on the response
    dispatch({
      type: 'CHECK_USER_PAID_STATUS_SUCCESS',
      payload: data,
    });

    // If is_expired is true, update userInfo token
    if (data.is_expired) {
      // Update userInfo token is_paid to false and paid_at to null
      userInfo.token.is_paid = false;
      userInfo.token.paid_at = null;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  } catch (error) {
    dispatch({
      type: 'CHECK_USER_PAID_STATUS_FAIL',
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};