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
function TransactionDetailsDialog({ transactionDetails, open, handleClose }) {
    const [transactionStatus, setTransactionStatus] = useState(null);
    const classes = useStyles();

    const handleSaveChanges = () => {
        // console.log(transactionDetails);
        console.log(
            transactionStatus,
            transactionDetails._id,
            transactionDetails.customerName
        );
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
                {/* Customer Name */}
                {transactionDetails?.customer && (
                    <DialogTextField
                        id="name"
                        label="Customer Name"
                        defaultValue={transactionDetails?.customer?.fullName}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                    />
                )}
                {/* Customer Address */}
                {transactionDetails?.customer && (
                    <DialogTextField
                        id="address"
                        label="Customer Address"
                        defaultValue={transactionDetails?.customer.address}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                    />
                )}
                {/* Customer Email */}
                {transactionDetails?.customer && (
                    <DialogTextField
                        id="email"
                        label="Customer Email"
                        defaultValue={transactionDetails?.customer.email}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                    />
                )}
                {/* Payment Method */}
                {transactionDetails?.customer && (
                    <DialogTextField
                        id="paymentMethod"
                        label="Payment Method"
                        defaultValue={transactionDetails?.paymentMethod}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        variant="outlined"
                    />
                )}
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
                <FormControl>
                    <Input
                        select
                        label="Status"
                        onChange={handleChangeStatus}
                        value={transactionStatus ?? transactionDetails.status}>
                        <MenuItem value="Submitted">Submitted</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Shipping">Shipping</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Input>
                </FormControl>
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
    "@global": {
        "div > p > b": {
            marginLeft: "3px",
        },
    },
}));
const DialogTextField = withStyles((theme) => ({
    root: {
        marginTop: "5px;",
    },
}))(TextField);
