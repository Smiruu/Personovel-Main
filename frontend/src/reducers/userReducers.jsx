import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_UPDATE_PAID_REQUEST,
    USER_UPDATE_PAID_SUCCESS,
    USER_UPDATE_PAID_FAIL,
    USER_UPDATE_PAID_RESET,
CHECK_PAID_STATUS_FAILURE,
CHECK_PAID_STATUS_SUCCESS,
CHECK_PAID_STATUS_REQUEST } from "../constants/userConstants";



export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading:true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}
            
        default:
            return state
        }
}

export const userUpdatePaidReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PAID_REQUEST:
            return { loading: true };
        case USER_UPDATE_PAID_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_PAID_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_PAID_RESET:
            return {};
        default:
            return state;
    }
};

const initialState = {
    loading: false,
    isExpired: null,
    error: null
  };
export const checkPaidStatusreducer = (state = initialState, action) => {
    switch (action.type) {
      case CHECK_PAID_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case CHECK_PAID_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          isExpired: action.payload.isExpired,
          error: null
        };
      case CHECK_PAID_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          isExpired: null,
          error: action.payload.error
        };
      default:
        return state;
    }
  };