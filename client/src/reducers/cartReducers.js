import { CART_ADD_ITEM } from "../action_types/cartTypes";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // Check to see if the product already exists in the cart
      const alreadyInCart = state.cartItems.find(
        (items) => items.product === item.product
      );

      if (alreadyInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === alreadyInCart.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
