import {
  INTERACTION_LIST_FAIL,
  INTERACTION_LIST_REQUEST,
  INTERACTION_LIST_SUCCESS,
  INTERACTION_DETAILS_FAIL,
  INTERACTION_DETAILS_REQUEST,
  INTERACTION_DETAILS_SUCCESS,
  INTERACTION_LIST_BY_BOOK_REQUEST,
  INTERACTION_LIST_BY_BOOK_SUCCESS,
  INTERACTION_LIST_BY_BOOK_FAIL,
} from "../constants/interactionConstants";
import {
  INTERACTION_CREATE_REQUEST,
  INTERACTION_CREATE_SUCCESS,
  INTERACTION_CREATE_FAIL,
  INTERACTION_CREATE_RESET,
  INTERACTION_UPDATE_REQUEST,
  INTERACTION_UPDATE_SUCCESS,
  INTERACTION_UPDATE_FAIL,
  INTERACTION_UPDATE_RESET,
  INTERACTION_DELETE_REQUEST,
  INTERACTION_DELETE_SUCCESS,
  INTERACTION_DELETE_FAIL,
  INTERACTION_DELETE_RESET,
} from "../constants/interactionConstants";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const listInteractions = () => async (dispatch) => {
  try {
    dispatch({ type: INTERACTION_LIST_REQUEST });

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

    const { data } = await instance.get("api/interactions/", config);
    const updatedData = data.map((interaction) => ({
      ...interaction,
    }));

    dispatch({
      type: INTERACTION_LIST_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listInteractionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INTERACTION_DETAILS_REQUEST });

    if (!id && id !== 0) {
      throw new Error("Invalid Interaction ID");
    }

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

    const { data } = await instance.get(`/api/interactions/${id}`, config);
    const updatedData = {
      ...data,
    };

    dispatch({
      type: INTERACTION_DETAILS_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listInteractionsByBook = (_id) => async (dispatch) => {
  try {
    dispatch({ type: INTERACTION_LIST_BY_BOOK_REQUEST });

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

    const { data } = await instance.get(`api/interactions/book/${_id}`, config);
    const updatedData = data.map((interaction) => ({
      ...interaction,
    }));

    dispatch({
      type: INTERACTION_LIST_BY_BOOK_SUCCESS,
      payload: updatedData,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_LIST_BY_BOOK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createInteraction = (formData) => async (dispatch) => {
  console.log(formData.chapter);
  console.log(formData.book);

  try {
    dispatch({ type: INTERACTION_CREATE_REQUEST });

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

    const { data } = await instance.post("api/interactions/", formData, config);

    dispatch({
      type: INTERACTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetInteraction = () => (dispatch) => {
  dispatch({ type: INTERACTION_CREATE_RESET });
};

export const updateInteraction = (id, formData) => async (dispatch) => {
  console.log(formData);

  try {
    dispatch({ type: INTERACTION_UPDATE_REQUEST });

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
      `api/interactions/${id}/update`,
      formData,
      config
    );

    dispatch({
      type: INTERACTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetInteractionUpdate = () => (dispatch) => {
  dispatch({ type: INTERACTION_UPDATE_RESET });
};

export const deleteInteraction = (id) => async (dispatch) => {
  try {
    dispatch({ type: INTERACTION_DELETE_REQUEST });

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

    await instance.delete(`api/interactions/${id}/delete`, config);

    dispatch({
      type: INTERACTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: INTERACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetDeleteInteraction = () => (dispatch) => {
  dispatch({ type: INTERACTION_DELETE_RESET });
};
