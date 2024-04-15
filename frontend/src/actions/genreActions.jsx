import {
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_CREATE_REQUEST,
  GENRE_CREATE_SUCCESS,
  GENRE_CREATE_FAIL,
  GENRE_CREATE_RESET,
  GENRE_UPDATE_REQUEST,
  GENRE_UPDATE_SUCCESS,
  GENRE_UPDATE_FAIL,
  GENRE_UPDATE_RESET,
  GENRE_DELETE_REQUEST,
  GENRE_DELETE_SUCCESS,
  GENRE_DELETE_FAIL,
  GENRE_DELETE_RESET,
} from "../constants/genreConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const listGenres = () => async (dispatch) => {
  try {
    dispatch({ type: GENRE_LIST_REQUEST });
    const { data } = await instance.get("api/genres/");
    dispatch({
      type: GENRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGenre = (genreData) => async (dispatch) => {
  try {
    dispatch({ type: GENRE_CREATE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const { data } = await instance.post("api/genres/", genreData, config);

    dispatch({
      type: GENRE_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({ type: GENRE_CREATE_RESET });
  } catch (error) {
    dispatch({
      type: GENRE_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateGenre = (id, updatedGenreData) => async (dispatch) => {
  try {
    dispatch({ type: GENRE_UPDATE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const { data } = await instance.put(
      `/api/genres/${id}/update`,
      updatedGenreData,
      config
    );

    dispatch({
      type: GENRE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetGenre = () => (dispatch) => {
  dispatch({ type: GENRE_UPDATE_RESET });
};

// Action for deleting a genre
export const deleteGenre = (id) => async (dispatch) => {
  try {
    dispatch({ type: GENRE_DELETE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    await instance.delete(`/api/genres/${id}/delete`, config);

    dispatch({ type: GENRE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: GENRE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetDeleteGenre = () => (dispatch) => {
  dispatch({ type: GENRE_DELETE_RESET });
};
