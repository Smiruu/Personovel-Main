import {
  INTERACTION_LIST_FAIL,
  INTERACTION_LIST_REQUEST,
  INTERACTION_LIST_SUCCESS,
  INTERACTION_DETAILS_FAIL,
  INTERACTION_DETAILS_REQUEST,
  INTERACTION_DETAILS_SUCCESS,
} from "../constants/interactionConstants";
import {
  INTERACTION_LIST_BY_BOOK_FAIL,
  INTERACTION_LIST_BY_BOOK_REQUEST,
  INTERACTION_LIST_BY_BOOK_SUCCESS,
} from "../constants/interactionConstants";
import {
  INTERACTION_CREATE_REQUEST,
  INTERACTION_CREATE_SUCCESS,
  INTERACTION_CREATE_FAIL,
  INTERACTION_CREATE_RESET,
} from "../constants/interactionConstants";
import {
  INTERACTION_UPDATE_REQUEST,
  INTERACTION_UPDATE_SUCCESS,
  INTERACTION_UPDATE_FAIL,
  INTERACTION_UPDATE_RESET,
} from "../constants/interactionConstants";
import {
  INTERACTION_DELETE_REQUEST,
  INTERACTION_DELETE_SUCCESS,
  INTERACTION_DELETE_FAIL,
  INTERACTION_DELETE_RESET,
} from "../constants/interactionConstants";

export const interactionListReducer = (
  state = { interactions: [] },
  action
) => {
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
};

export const interactionDetailsReducer = (
  state = { interaction: {} },
  action
) => {
  switch (action.type) {
    case INTERACTION_DETAILS_REQUEST:
      return { loading: true, interaction: {} };
    case INTERACTION_DETAILS_SUCCESS:
      return { loading: false, interaction: action.payload };
    case INTERACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const interactionListByBookReducer = (
  state = { interactions: [] },
  action
) => {
  switch (action.type) {
    case INTERACTION_LIST_BY_BOOK_REQUEST:
      return { loading: true, interactions: [] };
    case INTERACTION_LIST_BY_BOOK_SUCCESS:
      return { loading: false, interactions: action.payload };
    case INTERACTION_LIST_BY_BOOK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const interactionCreateReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case INTERACTION_CREATE_REQUEST:
      return { ...state, loading: true };
    case INTERACTION_CREATE_SUCCESS:
      return { loading: false, success: true, error: null };
    case INTERACTION_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case INTERACTION_CREATE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};

export const interactionUpdateReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case INTERACTION_UPDATE_REQUEST:
      return { ...state, loading: true };
    case INTERACTION_UPDATE_SUCCESS:
      return { loading: false, success: true, error: null };
    case INTERACTION_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case INTERACTION_UPDATE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};

export const interactionDeleteReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case INTERACTION_DELETE_REQUEST:
      return { ...state, loading: true };
    case INTERACTION_DELETE_SUCCESS:
      return { loading: false, success: true, error: null };
    case INTERACTION_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case INTERACTION_DELETE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
