import axios from 'axios';
import {
  PRODUCT_SEED_LIST_REQUEST,
  PRODUCT_SEED_LIST_SUCCESS,
  PRODUCT_SEED_LIST_FAIL,
  PRODUCT_SEED_DETAILS_REQUEST,
  PRODUCT_SEED_DETAILS_SUCCESS,
  PRODUCT_SEED_DETAILS_FAIL,
  SEED_DELETE_REQUEST,
  SEED_DELETE_SUCCESS,
  SEED_DELETE_FAIL,
  SEED_CREATE_REQUEST,
  SEED_CREATE_SUCCESS,
  SEED_CREATE_FAIL,
  SEED_UPDATE_REQUEST,
  SEED_UPDATE_FAIL,
  SEED_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from './../constants/productConstants.js';
import { logout } from './userActions';

const API_URL = process.env.REACT_APP_API_URL || '';

// Get All Seeds
export const listSeedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEED_LIST_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/seeds`
    );

    dispatch({
      type: PRODUCT_SEED_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEED_LIST_FAIL,
      payload:
        error.response?.data?.message ||
        error.message,
    });
  }
};

// Get Seed Details
export const listSeedProductsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEED_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${API_URL}/api/seeds/${id}`
    );

    dispatch({
      type: PRODUCT_SEED_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEED_DETAILS_FAIL,
      payload:
        error.response?.data?.message ||
        error.message,
    });
  }
};

// Delete Seed
export const deleteSeedProducts = (id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SEED_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `${API_URL}/api/seeds/${id}`,
      config
    );

    dispatch({
      type: SEED_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SEED_DELETE_FAIL,
      payload:
        error.response?.data?.message ||
        error.message,
    });
  }
};

// Create Seed
export const createSeedProducts = () => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SEED_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/seeds`,
      {},
      config
    );

    dispatch({
      type: SEED_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEED_CREATE_FAIL,
      payload:
        error.response?.data?.message ||
        error.message,
    });
  }
};

// Update Seed
export const updateSeedProducts = (seed) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SEED_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/seeds/${seed._id}`,
      seed,
      config
    );

    dispatch({
      type: SEED_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEED_UPDATE_FAIL,
      payload:
        error.response?.data?.message ||
        error.message,
    });
  }
};

// Create Review
export const createProductReview = (
  productId,
  review
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `${API_URL}/api/seeds/${productId}/reviews`,
      review,
      config
    );

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message;

    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }

    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};