import axios from "axios";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CONFIRM_CHANGE_PASSWORD_SUCCESS,
  CONFIRM_CHANGE_PASSWORD_REQUEST,
  CONFIRM_CHANGE_PASSWORD_FAIL,
} from "../constants/resetpasswordConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const sendrequestChangePassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await instance.post(
      "api/user/send-reset-password-email/",
      { email },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ConfirmChangePassword =
  (password, password2) => async (dispatch) => {
    try {
      dispatch({
        type: CONFIRM_CHANGE_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await instance.post(
        "reset-password/<uid>/<token>/",
        { password, password2 },
        config
      );

      dispatch({
        type: CONFIRM_CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CONFIRM_CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
