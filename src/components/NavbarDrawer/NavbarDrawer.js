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

export function NavbarDrawerSearchBar() {
    return (
        <div className="drawer">
            <div className="drawer__searchbar"></div>
        </div>
    );
}

export function NavbarDrawerCart({ itemList, onClickRemoveItemFromCart }) {
    // console.log(itemList);

    // const handleOnClickRemoveItemFromCart = (index) => {
    //     newItemList.splice(index, 1);
    // };
    const getTotalAmount = () => {
        return itemList.reduce((acc, item) => {
            const { price, count } = item;
            return (acc += price * count);
        }, 0);
    };
    return (
        <div className="drawer">
            {/* Header */}
            <div className="drawer__header">
                <h2>Cart</h2>
                <IconButton>
                    <CloseIcon style={{ fontSize: 35 }} />
                </IconButton>
            </div>

            {/* Body */}
            <div className="drawer__body">
                {itemList.map((item, index) => {
                    const { name, price, image, count } = item;
                    return (
                        <div className="cart__item" key={index}>
                            <div className="item__avatar">
                                <Avatar
                                    alt="item"
                                    src="../../static/img/img01.jpg"
                                />
                            </div>
                            <div className="item__informations">
                                <div className="item__informations-name">
                                    {name}
                                </div>
                                <div className="item__informations-size">
                                    36
                                </div>
                                <div className="item__informations-price">
                                    <span className="item__count">{count}</span>
                                    {price}
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
                <Typography className="amount">{getTotalAmount()}</Typography>
            </div>
        </div>
    );
}
