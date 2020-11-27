import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentMethodPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route path="/admin/productlist" exact component={ProductListPage} />
          <Route
            path="/admin/productlist/:pageNumber"
            exact
            component={ProductListPage}
          />
          <Route path="/admin/product/:id" component={ProductEditPage} />
          <Route path="/admin/orderlist" component={OrderListPage} />
          <Route path="/search/:keyword" exact component={HomePage} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            exact
            component={HomePage}
          />
          <Route path="/page/:pageNumber" exact component={HomePage} />
          <Route path="/" exact component={HomePage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
