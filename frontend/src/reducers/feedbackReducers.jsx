import {
    USER_FEEDBACK_REQUEST,
    USER_FEEDBACK_SUCCESS,
    USER_FEEDBACK_FAIL,
    USER_FEEDBACK_RESET
} from '../constants/feedbackConstants';

const initialState = {
    loading: false,
    success: false,
    error: null
};

export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_FEEDBACK_REQUEST:
            return { ...state, loading: true };
        case USER_FEEDBACK_SUCCESS:
            return { ...state, loading: false, success: true, error: null };
        case USER_FEEDBACK_FAIL:
            return { ...state, loading: false, success: false, error: action.payload };
        case USER_FEEDBACK_RESET:
            return initialState; // Resetting the state to initial state
        default:
            return state;
    }
};