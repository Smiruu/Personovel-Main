import {
  AUTHOR_LIST_REQUEST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_FAIL,
  AUTHOR_DETAILS_REQUEST,
  AUTHOR_DETAILS_SUCCESS,
  AUTHOR_DETAILS_FAIL,
} from "../constants/authorConstants";
import axios from 'axios';

export const listAuthors = () => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_LIST_REQUEST });

    const { data } = await axios.get('http://127.0.0.1:8000/api/authors/');
    dispatch({
      type: AUTHOR_LIST_SUCCESS,
      payload: data,
    });
    } catch (error) {
      dispatch({
        type: AUTHOR_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
    };