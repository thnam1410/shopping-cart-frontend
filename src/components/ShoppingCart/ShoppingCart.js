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
import AdminProduct from "../AdminPage/AdminProduct";
import { AdminPage } from "../AdminPage/AdminPage";
import { AdminAddProductReview } from "../AdminPage/AdminFormFields/AdminAddProductReview";
import AdminAppBar from "../AdminPage/AdminAppBar";

const Products = React.lazy(() => import("../Products/Products"));
const ProductItem = React.lazy(() => import("../ProductItem/ProductItem"));
function ShoppingCart() {
    return (
        <div>
            <Router>
                <AdminAppBar />
                <Navbar />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="/admin/product" component={AdminProduct}/>
                    <Route exact path="/admin/product/review" component={AdminAddProductReview}/>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/about" component={About} />
                    <Suspense fallback={<div> Loading </div>}>
                        <Route exact path="/product" component={Products} />
                        <Route
                            path="/product/:productId"
                            component={ProductItem}
                        />
                    </Suspense>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}


export default ShoppingCart;
