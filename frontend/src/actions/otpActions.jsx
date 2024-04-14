import axios from 'axios';
import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE
} from '../constants/otpConstants';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Update with your backend API base URL
});

export const verifyOTP = (user_id, otp_id, otp_code) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_OTP_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await instance.post(
      'api/user/verify-otp/',
      { user_id, otp_id, otp_code },
      config
    );
    userInfo.token.is_active = true;
    dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });

    // Return success explicitly
    return true; // Assuming the verification was successful
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });

    // Return false in case of failure
    return false;
  }
};

export const resendOTP = (user_id, otp_id, otp_code) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_OTP_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await instance.post(
      'api/user/resend-otp/',
      { user_id, otp_id, otp_code },
      config
    );

    dispatch({ type: RESEND_OTP_SUCCESS, payload: data });
    return true;
  } catch (error) {
    dispatch({
      type: RESEND_OTP_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });

  return false;
  }
};
