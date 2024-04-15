import * as actionTypes from "../constants/searchConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const searchBooks = (query) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SEARCH_REQUEST });

    console.log("Query Parameters:", query);

    const params = new URLSearchParams();
    for (const key in query) {
      params.append(key, query[key]);
    }

    const response = await instance.get("search/", { params });
    const data = response.data;

    dispatch({
      type: actionTypes.SEARCH_SUCCESS,
      payload: data.books,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH_FAIL,
      payload: error.message,
    });
  }
};
