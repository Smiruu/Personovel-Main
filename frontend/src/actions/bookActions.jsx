import {
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_RESET,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_RESET,
} from "../constants/bookConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      : {};

    const { data } = await instance.get("api/books/", config);
    const updatedData = data.map((book) => ({
      ...book,
      image: `${instance.defaults.baseURL}${book.image}`,
    }));

    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listBookDetails = (_id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      : {};

    const { data } = await instance.get(`/api/books/${_id}`, config);
    
    console.log("datadwasdawda : ", data);
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createBook = (formData) => async (dispatch) => {
  console.log(formData.image);
  try {
    dispatch({ type: BOOK_CREATE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const { data } = await instance.post("api/books/", formData, config);

    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetBook = () => (dispatch) => {
  dispatch({ type: BOOK_CREATE_RESET });
};

export const updateBook = (_id, formData) => async (dispatch) => {
  console.log(formData.image);

  try {
    dispatch({ type: BOOK_UPDATE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const { data } = await instance.put(
      `api/books/${_id}/update`,
      formData,
      config
    );

    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetUpdateBook = () => (dispatch) => {
  dispatch({ type: BOOK_UPDATE_RESET });
};

export const deleteBook = (_id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DELETE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    await instance.delete(`api/books/${_id}/delete`, config);

    dispatch({ type: BOOK_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetDeleteBook = () => (dispatch) => {
  dispatch({ type: BOOK_DELETE_RESET });
};
