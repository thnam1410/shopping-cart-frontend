import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "./CheckOut.scss";
import { processReduceCartItems } from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";

function CheckOut() {
    const cartItems = processReduceCartItems(
        useSelector((state) => state.cart.list)
    );

    return (
        <Grid container justify="center" spacing={5}>
            <Grid item xs={12} sm={8} md={6} lg={4} wrap>
                <div className="cart">
                    {cartItems.length === 0 ? (
                        <Typography variant="h4" align="center">
                            Your Cart is Empty
                        </Typography>
                    ) : (
                        <>
                            <div className="title">Cart</div>
                            {cartItems.map((item, index) => {
                                const {
                                    name,
                                    price,
                                    size,
                                    quantity,
                                    img,
                                } = item;
                                return (
                                    <div className="cartItem" key={index}>
                                        <Avatar
                                            className="cartItem__avatar"
                                            src={`${process.env.REACT_APP_API_URL}${img}`}
                                            alt="Product Image"
                                        />
                                        <div className="cartItem__content">
                                            <div className="cartItem__title">
                                                {name}
                                            </div>
                                            <div className="cartItem__price">
                                                {(
                                                    price * quantity
                                                ).toLocaleString("it-IT", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </div>
                                            <div className="cartItem__information">
                                                <div>{`Size: ${size}`}</div>
                                                <div>{`Quantity: ${quantity}`}</div>
                                            </div>
                                        </div>
                                        <button className="cartItem__btnDelete">
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                {cartItems.length !== 0 ? (
                    <div className="cart__footer">
                        <Button
                            className="btn__proceed"
                            color="primary"
                            variant="outlined">
                            Proceed
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <div className="cart">
                    {cartItems.length === 0 ? (
                        <Typography variant="h4" align="center">
                            Your Cart is Empty
                        </Typography>
                    ) : (
                        <>
                            <div className="title">Cart</div>
                            {cartItems.map((item, index) => {
                                const {
                                    name,
                                    price,
                                    size,
                                    quantity,
                                    img,
                                } = item;
                                return (
                                    <div className="cartItem" key={index}>
                                        <Avatar
                                            className="cartItem__avatar"
                                            src={`${process.env.REACT_APP_API_URL}${img}`}
                                            alt="Product Image"
                                        />
                                        <div className="cartItem__content">
                                            <div className="cartItem__title">
                                                {name}
                                            </div>
                                            <div className="cartItem__price">
                                                {(
                                                    price * quantity
                                                ).toLocaleString("it-IT", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </div>
                                            <div className="cartItem__information">
                                                <div>{`Size: ${size}`}</div>
                                                <div>{`Quantity: ${quantity}`}</div>
                                            </div>
                                        </div>
                                        <Button
                                            className="cartItem__btnDelete"
                                            color="secondary"
                                            variant="outlined">
                                            X
                                        </Button>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                {cartItems.length !== 0 ? (
                    <div className="cart__footer">
                        <Button
                            className="btn__proceed"
                            color="primary"
                            variant="outlined">
                            Proceed
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </Grid>
        </Grid>
    );
}

export default withRouter(CheckOut);
