import {
    Button,
    Typography,
    IconButton,
    Divider,
    Avatar,
} from "@material-ui/core";
import React from "react";
import "./NavbarDrawer.scss";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";

export function NavbarDrawerSearchBar() {
    return (
        <div className="drawer">
            <div className="drawer__searchbar"></div>
        </div>
    );
}

export function NavbarDrawerCart({
    itemList,
    onClickRemoveItemFromCart,
    toggleDrawer,
}) {
    let history = useHistory();
    const getTotalAmount = () => {
        return itemList.reduce((acc, item) => {
            const { price, quantity } = item;
            return (acc += price * quantity);
        }, 0);
    };
    const handleCheckOut = () => {
        toggleDrawer("right", false)();
        history.push("/checkout");
    };

    return (
        <div className="drawer">
            {/* Header */}
            <div className="drawer__header">
                <h2>Cart</h2>
                <IconButton onClick={toggleDrawer("right", false)}>
                    <CloseIcon style={{ fontSize: 35 }} />
                </IconButton>
            </div>

            {/* Body */}
            <div className="drawer__body">
                {itemList
                    .sort((a, b) =>
                        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                    )
                    .map((item, index) => {
                        const { name, size, price, quantity, img } = item;
                        return (
                            <div className="cart__item" key={index}>
                                <div className="item__avatar">
                                    <Avatar
                                        alt="item"
                                        src={`${process.env.REACT_APP_API_URL}${img}`}
                                    />
                                </div>
                                <div className="item__informations">
                                    <div className="item__informations-name">
                                        {name}
                                    </div>
                                    <div className="item__informations-size">
                                        {size}
                                    </div>
                                    <div className="item__informations-price">
                                        <span className="item__count">
                                            {quantity}
                                        </span>
                                        {price.toLocaleString("it-IT", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </div>
                                </div>
                                <div className="item__removebutton">
                                    <CloseIcon
                                        onClick={() => {
                                            onClickRemoveItemFromCart(item);
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>

            <Divider />
            {/* Footer */}
            <div className="drawer__footer">
                <Typography variant="h5">Total</Typography>
                <Typography className="amount">
                    {getTotalAmount().toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                    })}
                </Typography>
            </div>
            <div className="drawer__checkout">
                <Button
                    className="btn__checkout"
                    variant="outlined"
                    color="secondary"
                    onClick={handleCheckOut}>
                    Check Out
                </Button>
            </div>
        </div>
    );
}
