import React from "react";
import Product from "../../components/Product";
import { Row, Col } from "react-bootstrap";
import products from "../../products";

const HomePage = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, i) => (
          <Col sm={12} md={6} lg={4} xl={3} key={i}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
