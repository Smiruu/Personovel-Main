import { LOG_LIST_REQUEST, LOG_LIST_FAIL, LOG_LIST_SUCCESS, LOG_CREATE_REQUEST, LOG_CREATE_FAIL, LOG_CREATE_SUCCESS, LOG_CREATE_RESET} from "../constants/logConstants";
import axios from 'axios'; 
import { getUserDetails } from "../actions/profileActions";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const listLogs = () => async (dispatch) => {
  try {
    dispatch({ type: LOG_LIST_REQUEST });

    const { data } = await instance.get('api/logs/');
    dispatch({
      type: LOG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error fetching logs:', error);

    dispatch({
      type: LOG_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createLog = (log) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOG_CREATE_REQUEST,
    });

    // Dispatch the action to fetch user details
    await dispatch(getUserDetails());

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token.access : null;

    const config = token ? {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    } : {};

    // Ensure that the user ID is included in the log object
    const userDetails = getState().userDetails;
    const user = userDetails.loading ? null : userDetails.user;
    if (user) {
      log.user = user.id; // Assuming user ID is available in userDetails
    } else {
      // Handle case where userDetails are not available
      console.error('User details not available');
      return;
    }

    const { data } = await instance.post(`api/logs/`, log, config);

    dispatch({
      type: LOG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOG_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetCreateLog = () => (dispatch) => {
  dispatch({ type: LOG_CREATE_RESET });
};
