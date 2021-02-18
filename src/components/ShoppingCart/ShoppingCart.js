import React from "react";
import Navbar from "../Navbar/Navbar";
import "./ShoppingCart.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import Products from "../Products/Products";
import About from "../About/About";
import NotFound from "../NotFound/NotFound";
import ProductItem from "../ProductItem/ProductItem";
import Login from "../Login/Login";
import AdminPage from "../AdminPage/AdminPage";

function ShoppingCart() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={AdminPage} />
          <Route component={MainRoutes} />
          {/* <Route  component={NotFound} /> */}

        </Switch>
      </Router>
    </div>
  );
}

const MainRoutes = () => (
  <>
    <Navbar />
    <Route exact path="/" component={Homepage} />
    <Route exact path="/about" component={About} />
    <Route exact path="/product" component={Products} />
    <Route path="/product/:productId" component={ProductItem} />
              <Route  component={NotFound} />



    {/* <Redirect to="/404" /> */}
  </>
);

export default ShoppingCart;
