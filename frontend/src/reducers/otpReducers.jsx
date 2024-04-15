import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
} from "../constants/otpConstants";

const initialState = {
  verifyOtpLoading: false,
  verifyOtpError: null,
  resendOtpLoading: false,
  resendOtpError: null,
  success: false,
};

export const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESEND_OTP_REQUEST:
      return { ...state, resendOtpLoading: true, resendOtpError: null };
    case RESEND_OTP_SUCCESS:
      return { ...state, resendOtpLoading: false };
    case RESEND_OTP_FAILURE:
      return {
        ...state,
        resendOtpLoading: false,
        resendOtpError: action.payload,
      };

    default:
      return state;
  }
};

export const verifyOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return { loading: true };
    case VERIFY_OTP_SUCCESS:
      return { loading: false, success: true };
    case VERIFY_OTP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
