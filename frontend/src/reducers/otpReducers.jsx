import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE
} from '../constants/otpConstants';

const initialState = {
  verifyOtpLoading: false,
  verifyOtpError: null,
  resendOtpLoading: false,
  resendOtpError: null
};

export const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return { ...state, verifyOtpLoading: true, verifyOtpError: null };
    case VERIFY_OTP_SUCCESS:
      return { ...state, verifyOtpLoading: false };
    case VERIFY_OTP_FAILURE:
      return { ...state, verifyOtpLoading: false, verifyOtpError: action.payload };

    case RESEND_OTP_REQUEST:
      return { ...state, resendOtpLoading: true, resendOtpError: null };
    case RESEND_OTP_SUCCESS:
      return { ...state, resendOtpLoading: false };
    case RESEND_OTP_FAILURE:
      return { ...state, resendOtpLoading: false, resendOtpError: action.payload };

    default:
      return state;
  }
};
