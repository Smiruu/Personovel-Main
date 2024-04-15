import * as actionTypes from "../constants/preferenceConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const addToReadingHistory = (bookId, userId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_TO_READING_HISTORY_REQUEST });

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

    await instance.post("add_to_reading_history/", {
      book_id: bookId,
      user_id: userId,
      config,
    });

    dispatch({ type: actionTypes.ADD_TO_READING_HISTORY_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_READING_HISTORY_FAILURE,
      payload: error.message,
    });
  }
};

export const getRecommendedBooks = (userId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_RECOMMENDED_BOOKS_REQUEST });

    const response = await instance.get(`get_recommended_books/${userId}`, {
      data: { user_id: userId },
    });
    console.log("Response", response.data);

    const books = response.data;
    console.log(books);
    dispatch({
      type: actionTypes.GET_RECOMMENDED_BOOKS_SUCCESS,
      payload: { preferredGenre: null, books },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_RECOMMENDED_BOOKS_FAILURE,
      payload: error.message,
    });
  }
};

export const setPreferredGenre = (userId, pickedGenres) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_PREFERRED_GENRE_REQUEST });

  try {
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

    const data = {
      preferred_genres: pickedGenres,
    };

    const response = await instance.post(
      `users/${userId}/preferred-genre/`,
      data,
      config
    );

    dispatch({ type: actionTypes.SET_PREFERRED_GENRE_SUCCESS });
    return true;
  } catch (error) {
    dispatch({
      type: actionTypes.SET_PREFERRED_GENRE_FAILURE,
      payload: error.message,
    });
    return false;
  }
};

export const getPreferredGenres = (userId) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PREFERRED_GENRES_REQUEST });

  try {
    const response = await instance.get(
      `users/${userId}/get-preferred-genres/`
    );
    dispatch({
      type: actionTypes.GET_PREFERRED_GENRES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PREFERRED_GENRES_FAILURE,
      payload: error.message,
    });
  }
};

export const getRandomBooks = (userId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_RANDOM_BOOKS_REQUEST });

    const response = await instance.get(`users/${userId}/random-books/`);

    dispatch({
      type: actionTypes.GET_RANDOM_BOOKS_SUCCESS,
      payload: response.data,
    });

    console.log("Random", response.data);
  } catch (error) {
    dispatch({
      type: actionTypes.GET_RANDOM_BOOKS_FAILURE,
      payload: error.message,
    });
  }
};
