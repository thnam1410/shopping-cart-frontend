import React, { Suspense } from "react";
import Navbar from "../Navbar/Navbar";
import "./ShoppingCart.scss";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Homepage from "../Homepage/Homepage";
// import Products from "../Products/Products";
import About from "../About/About";
import NotFound from "../NotFound/NotFound";
// import ProductItem from "../ProductItem/ProductItem";
import Login from "../Login/Login";
import AdminPage from "../AdminPage/AdminPage";

const Products = React.lazy(() => import("../Products/Products"));
const ProductItem = React.lazy(() => import("../ProductItem/ProductItem"));
function ShoppingCart() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={AdminPage} />
                    <Route path="/" component={MainRoutes} />
                    <Route component={NotFound} />
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
        <Suspense fallback={<div> Loading </div>}>
            <Route exact path="/product" component={Products} />
            <Route path="/product/:productId" component={ProductItem} />
        </Suspense>
    </>
);

export default ShoppingCart;
