import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, Grid, MenuItem, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import * as yup from "yup";
import { Form } from "../AdminPage/AdminFormFields/Form";
import { FormContainer } from "../AdminPage/AdminFormFields/FormContainer";
import { FormTitle } from "../AdminPage/AdminFormFields/FormTitle";
import { Input } from "../AdminPage/AdminFormFields/Input";
import "./CheckOut.scss";
import PaymentDialog from "./PaymentDialog";

const phoneRegex = new RegExp(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
);
const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const schema = yup.object().shape({
    fullName: yup
        .string()
        .required("This is a require field")
        .max(100, "Your name can not longer like that??"),
    email: yup
        .string()
        .required("This is a require field")
        .matches(emailRegex, "Email is not valid")
        .max(100, "Your email can not longer like that?"),
    phoneNumber: yup
        .string()
        .required("This is a require field")
        .matches(phoneRegex, "Phone number is not valid")
        .max(15, "Phone number is not valid"),
    address: yup
        .string()
        .required("This is a require field")
        .max(100, "Your address can not longer like that??"),
});

function CheckOut() {
    const [openDialog, setOpenDialog] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("None");
    const [paymentMethodRequired, setPaymentMethodRequired] = useState(false);
    const [
        currentPaymentInformations,
        setCurrentPaymentInformations,
    ] = useState({});
    const history = useHistory();
    const cartItems = useSelector((state) => state.cart.list);
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            address: "",
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        if (paymentMethodRequired === false && paymentMethod !== "None") {
            setOpenDialog(true);
            setCurrentPaymentInformations({
                ...data,
                paymentMethod,
            });
        } else {
            setPaymentMethodRequired(true);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleChangePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
        setPaymentMethodRequired(false);
    };
    const onAgreeDialog = () => {
        setOpenDialog(false);
        history.push({
            pathname: "/checkout/review",
            state: { data: currentPaymentInformations },
        });
    };

    return (
        <>
            <Grid container justify="center" spacing={5}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <FormContainer>
                        <FormTitle>Payment Informations</FormTitle>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            {/* Full Name */}
                            <Input
                                name="fullName"
                                type="text"
                                ref={register}
                                placeholder="Full Name"
                                label="Full Name"
                                error={!!errors?.fullName}
                                helperText={errors?.fullName?.message}
                            />

                            {/* Email */}
                            <Input
                                name="email"
                                type="email"
                                ref={register}
                                placeholder="Email"
                                label="Email"
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                            />
                            {/* Phone Number */}
                            <Input
                                name="phoneNumber"
                                type="text"
                                ref={register}
                                placeholder="Phone Number"
                                label="Phone Number"
                                error={!!errors?.phoneNumber}
                                helperText={errors?.phoneNumber?.message}
                            />

                            {/* Address */}
                            <Input
                                name="address"
                                type="text"
                                ref={register}
                                placeholder="Address"
                                label="Address"
                                error={!!errors?.address}
                                helperText={errors?.address?.message}
                            />
                            <Input
                                select
                                label="Payment Method"
                                onChange={handleChangePaymentMethod}
                                value={paymentMethod}
                                error={paymentMethodRequired ? true : false}
                                helperText={
                                    paymentMethodRequired
                                        ? "Payment is required"
                                        : ""
                                }>
                                <MenuItem value="None">Payment Method</MenuItem>
                                <MenuItem value="COD">Ship COD</MenuItem>
                                <MenuItem value="Banking">Banking</MenuItem>
                            </Input>
                            {cartItems.length !== 0 ? (
                                <div className="cart__footer">
                                    <Button
                                        type="submit"
                                        className="btn__proceed"
                                        color="primary"
                                        variant="outlined">
                                        Proceed
                                    </Button>
                                </div>
                            ) : (
                                ""
                            )}
                        </Form>
                    </FormContainer>
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
                                            <div className="cartItem__btnDelete">
                                                <CloseIcon />
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </Grid>
            </Grid>
            <PaymentDialog
                open={openDialog}
                handleClose={handleClose}
                onAgreeDialog={onAgreeDialog}
            />
        </>
    );
}

export default withRouter(CheckOut);
