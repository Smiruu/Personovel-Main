import { INTERACTION_LIST_FAIL, INTERACTION_LIST_REQUEST, INTERACTION_LIST_SUCCESS } from "../constants/interactionConstants";
import { INTERACTION_DETAILS_FAIL, INTERACTION_DETAILS_REQUEST, INTERACTION_DETAILS_SUCCESS } from "../constants/interactionConstants";
import axios from 'axios';

export const listInteractions = () => async (dispatch) => {
    try {
        dispatch({ type: INTERACTION_LIST_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:8000/api/interactions/`);
        dispatch({
        type: INTERACTION_LIST_SUCCESS,
        payload: data,
        });
    } catch (error) {
        dispatch({
        type: INTERACTION_DETAILS_FAIL,
        payload:
            error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
        });
    }
}
