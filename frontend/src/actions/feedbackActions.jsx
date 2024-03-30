import axios from 'axios';
import {
    USER_FEEDBACK_REQUEST,
    USER_FEEDBACK_SUCCESS,
    USER_FEEDBACK_FAIL,
    USER_FEEDBACK_RESET,
    USER_FEEDBACK_LIST_REQUEST,
    USER_FEEDBACK_LIST_SUCCESS,
    USER_FEEDBACK_LIST_FAIL,
    USER_FEEDBACK_DELETE_REQUEST,
    USER_FEEDBACK_DELETE_SUCCESS,
    USER_FEEDBACK_DELETE_FAIL,
    USER_FEEDBACK_DELETE_RESET,

} from '../constants/feedbackConstants';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
  });

export const submitFeedback = (email, subject, concern, createdAt, id) => async (dispatch) => {
    try {
        dispatch({ type: USER_FEEDBACK_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const feedbackData = {
            email,
            subject,
            concern,
            createdAt,
            id,
        };
        const { data } = await instance.post(
            'api/feedbacks/',
            feedbackData,
            config
        );
        dispatch({
            type: USER_FEEDBACK_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: USER_FEEDBACK_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

export const resetFeedback = () => (dispatch) => {
    dispatch({ type: USER_FEEDBACK_RESET });
};


export const fetchFeedbacks = () => async (dispatch) => {
    try {
        dispatch({ type: USER_FEEDBACK_LIST_REQUEST });
        const { data } = await instance.get('api/feedbacks/');
        dispatch({
            type: USER_FEEDBACK_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_FEEDBACK_LIST_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

export const deleteFeedback = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_FEEDBACK_DELETE_REQUEST });
        await instance.delete(`/api/feedbacks/${id}/delete`);
        dispatch({ type: USER_FEEDBACK_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: USER_FEEDBACK_DELETE_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

export const resetDeleteFeedback = () => (dispatch) => {
    dispatch({ type: USER_FEEDBACK_DELETE_RESET });
};
