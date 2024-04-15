import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
} from "../constants/bookConstants";
import {
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
} from "../constants/bookConstants";
import {
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_RESET,
} from "../constants/bookConstants";
import {
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
} from "../constants/bookConstants";
import {
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_RESET,
} from "../constants/bookConstants";

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, books: [] };
    case BOOK_LIST_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookDetailsReducer = (
  state = { book: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BOOK_DETAILS_SUCCESS:
      return { loading: false, book: action.payload };
    case BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookCreateReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { ...state, loading: true };
    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true, error: null };
    case BOOK_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case BOOK_CREATE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};

export const bookUpdateReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { ...state, loading: true };
    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true, error: null };
    case BOOK_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case BOOK_UPDATE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};

export const bookDeleteReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { ...state, loading: true };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true, error: null };
    case BOOK_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case BOOK_DELETE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
