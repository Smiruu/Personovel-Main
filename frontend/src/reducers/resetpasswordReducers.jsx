import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CONFIRM_CHANGE_PASSWORD_SUCCESS,
  CONFIRM_CHANGE_PASSWORD_REQUEST,
  CONFIRM_CHANGE_PASSWORD_FAIL,
} from "../constants/resetpasswordConstants";

export const SendChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ConfirmChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CONFIRM_CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case CONFIRM_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
