import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PAID_REQUEST,
  USER_UPDATE_PAID_SUCCESS,
  USER_UPDATE_PAID_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_REQUEST,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../constants/userConstants";

const instance = axios.create({
  baseURL: "https://dplsplsdeploy-be98d8b2fd29.herokuapp.com/",
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
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
    return false;
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
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

    const currentDate = new Date().toISOString();

    await instance.put(`api/user/pay/${userId}/`, {}, config);

    userInfo.token.is_paid = true;
    userInfo.token.paid_at = currentDate;
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

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        }
      : {};

    const { data } = await instance.get(
      `api/user/check-paid-status/${userId}/`,
      config
    );

    dispatch({
      type: "CHECK_USER_PAID_STATUS_SUCCESS",
      payload: data,
    });

    if (data.is_expired) {
      userInfo.token.is_paid = false;
      userInfo.token.paid_at = null;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  } catch (error) {
    dispatch({
      type: "CHECK_USER_PAID_STATUS_FAIL",
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
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

    const { data } = await instance.get("/api/user/list/", config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserInfo = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_INFO_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token : null;
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        }
      : {};

    const { data } = await instance.get(`api/user/detail/`, config);

    dispatch({
      type: GET_USER_INFO_SUCCESS,
      payload: data,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_USER_INFO_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token : null;
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        }
      : {};

    await instance.delete(`api/user/detail/${userId}/`, config);

    dispatch({
      type: DELETE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token : null;
    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        }
      : {};

    const { data } = await instance.patch(
      `api/user/detail/${userId}/`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
