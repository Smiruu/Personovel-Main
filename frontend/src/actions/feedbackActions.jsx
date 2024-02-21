import axios from 'axios';
import {
    USER_FEEDBACK_REQUEST,
    USER_FEEDBACK_SUCCESS,
    USER_FEEDBACK_FAIL,
    USER_FEEDBACK_RESET,
} from '../constants/feedbackConstants';

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
        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/feedbacks/',
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
