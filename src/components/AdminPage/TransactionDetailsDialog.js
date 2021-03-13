import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    makeStyles,
    Typography,
    Divider,
    withStyles,
    MenuItem,
    FormControl,
} from "@material-ui/core";
import { Input } from "./AdminFormFields/Input";
import axiosClient from "../../api/axiosClient";

function TransactionDetailsDialog({
    transactionDetails,
    open,
    handleClose,
    changeTransactionState,
}) {
    const [transactionStatus, setTransactionStatus] = useState(null);
    const classes = useStyles();

    const handleSaveChanges = () => {
        const status = transactionStatus;
        axiosClient
            .post("/api/transaction-status", {
                _id: transactionDetails._id,
                status,
            })
            .then((res) => {
                alert("Change Status Successfully");
                handleClose();
                changeTransactionState(transactionDetails._id, status);
            })
            .catch((err) => {
                console.log(err);
                alert("Something error ! Can not change status");
                handleClose();
            });
    };
    const handleChangeStatus = (e) => {
        setTransactionStatus(e.target.value);
    };
    useEffect(() => {
        setTransactionStatus(transactionDetails.status);
    }, [transactionDetails]);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            onExited={() => {
                setTransactionStatus(transactionDetails.status);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
                <Typography color="secondary">Transaction Details</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {/* Customer Informations */}
                <Typography variant="h6" color="secondary">
                    Customer Informations
                </Typography>
                <div className={classes.informationWrapper}>
                    {/* Customer Name */}
                    {transactionDetails.customerName && (
                        <DialogTextField
                            id="name"
                            label="Customer Name"
                            defaultValue={transactionDetails.customerName}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            margin="dense"
                        />
                    )}
                    {/* Customer Address */}
                    {transactionDetails.address && (
                        <DialogTextField
                            id="address"
                            label="Customer Address"
                            defaultValue={transactionDetails.address}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            margin="dense"
                        />
                    )}
                    {/* Customer Email */}
                    {transactionDetails.email && (
                        <DialogTextField
                            id="email"
                            label="Customer Email"
                            defaultValue={transactionDetails.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            margin="dense"
                        />
                    )}
                    {/* Payment Method */}
                    {transactionDetails.paymentMethod && (
                        <DialogTextField
                            id="paymentMethod"
                            label="Payment Method"
                            defaultValue={transactionDetails.paymentMethod}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            margin="dense"
                        />
                    )}
                </div>
                {/* Transaction Products */}
                {transactionDetails?.products.map((product, index) => {
                    const { name, size, price, quantity } = product;
                    return (
                        <div className={classes.productItem} key={index}>
                            <h3>{name}</h3>
                            <div className={classes.productInfor}>
                                <div className={classes.productInfor__left}>
                                    <p>
                                        Size: <b> {size}</b>
                                    </p>
                                    <p>
                                        Quantity: <b>{quantity}</b>
                                    </p>
                                </div>
                                <div className={classes.productInfor__right}>
                                    <p>
                                        Price:
                                        <b>
                                            {price.toLocaleString("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className={classes.totalPrice}>
                    Total: <h3>{transactionDetails?.totalPrice}</h3>
                </div>
                <div className={classes.informationWrapper}>
                    <FormControl style={{ width: "50%" }}>
                        <Input
                            select
                            label="Status"
                            variant="outlined"
                            margin="normal"
                            onChange={handleChangeStatus}
                            value={
                                transactionStatus ?? transactionDetails.status
                            }>
                            <MenuItem value="Submitted">Submitted</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Shipping">Shipping</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                        </Input>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveChanges} color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TransactionDetailsDialog;

const useStyles = makeStyles((theme) => ({
    productInfor: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        paddingTop: "2px",
        marginBottom: "15px",
    },
    totalPrice: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        "& > h3": {
            marginLeft: "5px",
        },
    },
    productInfor__left: {
        padding: "5px 20px 5px 0",
    },
    productInfor__right: {
        padding: "5px 0 5px 20px",
    },
    informationWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    DialogTextField: {
        margin: "5px",
    },
    form: {
        margin: "auto",
    },
    "@global": {
        "div > p > b": {
            marginLeft: "3px",
        },
    },
}));
const DialogTextField = withStyles((theme) => ({
    root: {
        margin: "5px",
    },
}))(TextField);
