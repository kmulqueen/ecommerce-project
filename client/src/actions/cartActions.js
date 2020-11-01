import axios from "axios";
import { CART_ADD_ITEM } from "../action_types/cartTypes";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const res = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: res.data._id,
      name: res.data.name,
      image: res.data.image,
      price: res.data.price,
      numInStock: res.data.numInStock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};