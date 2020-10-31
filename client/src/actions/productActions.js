import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
} from "../action_types/productTypes";

export const listProducts = () => async (dispatch) => {
  try {
    // Dispatch request for products
    dispatch({ type: PRODUCT_LIST_REQUEST });
    // Make API Call
    const res = await axios.get("/api/products");
    // Dispatch success if products found
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetils = (id) => async (dispatch) => {
  try {
    // Dispatch request for specific product's details
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    // Make API Call
    const res = await axios.get(`/api/products/${id}`);
    // Dispatch success if products found
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
