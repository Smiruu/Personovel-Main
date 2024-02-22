// reducers/userReducer.js
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS,
} from '../actions/userActions';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null };

    case USER_DETAILS_FAILURE:
      return { ...state, loading: false, userInfo: null, error: action.payload };

    case UPDATE_USER_DETAILS:
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
};

export default userReducer;
