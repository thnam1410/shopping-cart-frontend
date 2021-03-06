import { Avatar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormContainer } from "../AdminPage/AdminFormFields/FormContainer";
import { PrimaryButton } from "../AdminPage/AdminFormFields/PrimaryButton";
import "./CheckOutReview.scss";
import axiosClient from "../../api/axiosClient";
import { removeAllItem } from "../../actions/cart";
const useStyles = makeStyles({
    root: {
        margin: "30px 0",
    },
    title: {
        paddingTop: "50px",
    },
    listItem: {
        overflow: "hidden",
    },
});
export const CheckOutReview = withRouter(({ history, location }) => {
    const styles = useStyles();
    const cart = useSelector((state) => state.cart.list);
    const dispatch = useDispatch();

    const templates = [
        "Full Name",
        "Email",
        "Phone Number",
        "Address",
        "Payment Method",
    ];
    const entries = Object.entries(location.state.data).map((item, index) => [
        templates[index],
        item[1],
    ]);
    const getTotalPriceOfCart = () =>
        cart.reduce(
            (total, { quantity, price }) => (total += quantity * price),
            0
        );
    const confirmCheckOut = () => {
        axiosClient
            .post("/api/checkout", {
                cart,
                paymentInformations: location.state.data,
            })
            .then((res) => {
                console.log("success");
                dispatch(removeAllItem());
                alert("Purchase success");
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
    };
    return (
        <>
            <FormContainer>
                <Typography
                    className={styles.title}
                    component="h2"
                    variant="h5">
                    📋 Payment Informations
                </Typography>
                <TableContainer className={styles.root} component={Paper}>
                    <Table className={styles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Field</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entries.map((entry) => (
                                <TableRow key={entry[0]}>
                                    <TableCell component="th" scope="row">
                                        {entry[0]}
                                    </TableCell>
                                    <TableCell align="right">
                                        {entry[1].toString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography component="h2" variant="h5">
                    📦 Cart
                </Typography>
                {cart &&
                    cart.map(({ name, price, size, quantity, img }, index) => (
                        <div key={index}>
                            <List className={styles.listItem}>
                                <ListItem className="cart__item">
                                    <ListItemIcon>
                                        <Avatar
                                            src={`${process.env.REACT_APP_API_URL}${img}`}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className={styles.listItem}
                                        primary={`Product Name: ${name}`}
                                        secondary={`Size: ${size} - Quantity: ${quantity} `}
                                    />
                                    <div className="cart__price">
                                        {price.toLocaleString("it-IT", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </div>
                                </ListItem>
                            </List>
                        </div>
                    ))}
                {
                    <div className="cart__total">
                        <Typography component="h2" variant="h5">
                            💲Total:
                        </Typography>
                        <div className="cart__total-price">
                            {getTotalPriceOfCart().toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </div>
                    </div>
                }
                <div className="button__field">
                    <PrimaryButton
                        color="primary"
                        onClick={() => {
                            history.push("/checkout");
                        }}>
                        Go To Previous Page
                    </PrimaryButton>
                    <PrimaryButton color="secondary" onClick={confirmCheckOut}>
                        Confirm
                    </PrimaryButton>
                </div>
            </FormContainer>
        </>
    );
});
