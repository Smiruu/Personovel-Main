import {
  AUTHOR_LIST_REQUEST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_FAIL,
  AUTHOR_DETAILS_REQUEST,
  AUTHOR_DETAILS_SUCCESS,
  AUTHOR_DETAILS_FAIL,
} from "../constants/authorConstants";

export const authorListReducer = (state = { authors: [] }, action) => {
  switch (action.type) {
    case AUTHOR_LIST_REQUEST:
      return { loading: true, authors: [] };
    case AUTHOR_LIST_SUCCESS:
      return { loading: false, authors: action.payload };
    case AUTHOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authorDetailsReducer = (
  state = { author: { books: [] } },
  action
) => {
  switch (action.type) {
    case AUTHOR_DETAILS_REQUEST:
      return { loading: true, ...state };
    case AUTHOR_DETAILS_SUCCESS:
      return { loading: false, author: action.payload };
    case AUTHOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
