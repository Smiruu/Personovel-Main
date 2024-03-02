import { INTERACTION_LIST_FAIL, INTERACTION_LIST_REQUEST, INTERACTION_LIST_SUCCESS,INTERACTION_DETAILS_FAIL, INTERACTION_DETAILS_REQUEST, INTERACTION_DETAILS_SUCCESS } from "../constants/interactionConstants";


export const interactionListReducer = (state = { interactions: [] }, action) => {
  switch (action.type) {
    case INTERACTION_LIST_REQUEST:
      return { loading: true, interactions: [] };
    case INTERACTION_LIST_SUCCESS:
      return { loading: false, interactions: action.payload };
    case INTERACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const interactionDetailsReducer = (state = { interaction: {} }, action) => {
  switch (action.type) {
    case INTERACTION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case INTERACTION_DETAILS_SUCCESS:
      return { loading: false, interaction: action.payload };
    case INTERACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}