import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../../components/Message";
import { addToCart } from "../../actions/cartActions";

const CartPage = ({ match, location, history }) => {
  // Matches id from URL
  const productID = match.params.id;
  // Matches ?qty=x from URL, split to get just the number
  const productQuantity = location.search
    ? Number(location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, productQuantity));
    }
  }, [dispatch, productID, productQuantity]);

  return <div>Cart Page</div>;
};

export default CartPage;
