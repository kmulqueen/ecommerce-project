import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";

const ShippingPage = ({ history }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
    // dispatch save shipping address
  };
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}></Form>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="postal-code">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary">
        Continue
      </Button>
    </FormContainer>
  );
};

export default ShippingPage;
