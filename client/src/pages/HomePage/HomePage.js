import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/Product";
import { Row, Col } from "react-bootstrap";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

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
