import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "../About/About";
import AdminAppBar from "../AdminPage/AdminAppBar";
import { AdminAddProductReview } from "../AdminPage/AdminFormFields/AdminAddProductReview";
import { AdminPage } from "../AdminPage/AdminPage";
import AdminProduct from "../AdminPage/AdminProduct";
import CheckOut from "../CheckOut/CheckOut";
import { CheckOutReview } from "../CheckOutReview/CheckOutReview";
import Homepage from "../Homepage/Homepage";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import NotFound from "../NotFound/NotFound";
import ProductItem from "../ProductItem/ProductItem";
import Products from "../Products/Products";
import AdminManageProducts from "../AdminPage/AdminManageProducts";
import "./ShoppingCart.scss";

function ShoppingCart() {
    return (
        <div>
            <Router>
                <AdminAppBar />
                <Navbar />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={AdminPage} />
                    <Route
                        exact
                        path="/admin/product"
                        component={AdminProduct}
                    />
                    <Route
                        exact
                        path="/admin/product/review"
                        component={AdminAddProductReview}
                    />
                    <Route
                        exact
                        path="/admin/view-products"
                        component={AdminManageProducts}
                    />

                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/checkout" component={CheckOut} />
                    <Route
                        exact
                        path="/checkout/review"
                        component={CheckOutReview}
                    />
                    <Route exact path="/product" component={Products} />

                    <Route path="/product/:productId" component={ProductItem} />

                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default ShoppingCart;
