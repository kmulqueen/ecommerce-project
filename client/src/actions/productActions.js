import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
} from "../action_types/productListTypes";

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
