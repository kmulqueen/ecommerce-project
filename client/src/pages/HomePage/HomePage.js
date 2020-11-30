import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";
import Product from "../../components/Product";
import Message from "../../components/Message";
import Splash from "../../components/Splash";
import Paginate from "../../components/Paginate";
import ProductCarousel from "../../components/ProductCarousel";
import Meta from "../../components/Meta";
import { Row, Col } from "react-bootstrap";

const HomePage = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Check for keyword query
  const keyword = match.params.keyword;
  // Check for pageNumber query. Default to 1 if not found
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    // Lists all products or products that match keyword search
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {/* If no search query, show product carousel */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Splash />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, i) => (
              <Col sm={12} md={6} lg={4} xl={3} key={i}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
