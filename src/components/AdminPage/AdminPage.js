import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axiosClient from "../../api/axiosClient";
import TransactionDetailsDialog from "./TransactionDetailsDialog";

const tableColumns = [
    { id: "orderNo", label: "No.", minWidth: 50 },
    { id: "customerName", label: "Customer Name", minWidth: 100 },
    { id: "phoneNumber", label: "Phone Number", minWidth: 100 },
    {
        id: "totalPrice",
        label: "Total Price",
        minWidth: 100,
        format: (value) =>
            value.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
            }),
    },
    { id: "products", label: "Products", minWidth: 400 },
    { id: "paymentMethod", label: "Payment Method", minWidth: 100 },
    {
        id: "createdAt",
        label: "Order Create Time",
        minWidth: 100,
        format: (value) => new Date(value).toLocaleString(),
    },
    {
        id: "updatedAt",
        label: "Status Change Time",
        minWidth: 100,
        format: (value) => new Date(value).toLocaleString(),
    },
    { id: "status", label: "Status", minWidth: 100 },
];
export const AdminPage = () => {
    //AdminPage Variables
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const indexColumnArray = Array.from(
        { length: rowsPerPage },
        (_, i) => count - (i + (page + 1) * rowsPerPage - rowsPerPage)
    );

    //Dialog Variables
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTransactionClick, setCurrentTransactionClick] = useState(
        null
    );
    // const [transactionDetails, setTransactionDetails] = useState(null);
    useEffect(() => {
        axiosClient
            .get("/api/transaction", {
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                },
            })
            .then((res) => {
                const { docs, total } = res;
                const reFormatDocs = docs.map((item) => {
                    const {
                        _id,
                        customer,
                        products,
                        paymentMethod,
                        totalPrice,
                        status,
                        createdAt,
                        updatedAt,
                    } = item;
                    return {
                        _id,
                        customerName: customer.fullName,
                        phoneNumber: customer.phoneNumber,
                        totalPrice,
                        products,
                        paymentMethod,
                        createdAt,
                        updatedAt,
                        status,
                    };
                });
                setCount(total);
                setTransactions(reFormatDocs);
            })
            .catch((err) => console.log(err));
    }, [page, rowsPerPage]);

    // useEffect(() => {
    //     const getTransactionDetails = async () => {
    //         const transactionDetails = await axiosClient.get(
    //             "/api/transaction-detail",
    //             {
    //                 params: {
    //                     productId: currentTransactionClick,
    //                 },
    //             }
    //         );

    //         setTransactionDetails(transactionDetails);
    //     };
    //     if (currentTransactionClick) getTransactionDetails();
    // }, [currentTransactionClick]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const renderProductInRow = (products) => {
        return products.map((product, index) => {
            const { name, size, quantity } = product;
            return (
                <div className={classes.productCell} key={index}>
                    <div className={classes.productName}>{name}</div>
                    <div className={classes.productInfor}>
                        <div className={classes.size}>Size: {size}</div>
                        <div className={classes.quantity}>
                            Quantity: {quantity}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleOnClickTransaction = (id) => {
        const transaction = transactions.filter((x) => x._id === id)[0];
        setCurrentTransactionClick(transaction);
        setOpenDialog(true);
    };
    return (
        <>
            <Paper className={classes.root}>
                <TablePagination
                    className={classes.paginate}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableColumns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            textAlign: "center",
                                        }}>
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row, index) => {
                                const orderStatus = row["status"];
                                row["orderNo"] = indexColumnArray[index];
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                        onClick={() =>
                                            handleOnClickTransaction(row._id)
                                        }
                                        style={{ cursor: "pointer" }}>
                                        {tableColumns.map(
                                            (column, colIndex) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        className={`${
                                                            orderStatus ===
                                                            "Submitted"
                                                                ? classes.SubmittedCell
                                                                : orderStatus ===
                                                                  "Cancelled"
                                                                ? classes.CancelledCell
                                                                : orderStatus ===
                                                                  "Pending"
                                                                ? classes.PendingCell
                                                                : orderStatus ===
                                                                  "Shipping"
                                                                ? classes.ShippingCell
                                                                : classes.DoneCell
                                                        } + ${
                                                            classes.TableBorder
                                                        }`}>
                                                        {column.id !==
                                                        "products"
                                                            ? column.format
                                                                ? column.format(
                                                                      value
                                                                  )
                                                                : value
                                                            : renderProductInRow(
                                                                  value
                                                              )}
                                                    </TableCell>
                                                );
                                            }
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {currentTransactionClick && (
                <TransactionDetailsDialog
                    open={openDialog}
                    handleClose={() => setOpenDialog(false)}
                    transactionDetails={currentTransactionClick}
                />
            )}
        </>
    );
};

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 15,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "50px",
    },
    productCell: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px",
    },
    productInfor: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        "& > div": {
            padding: "2px",
        },
    },
    paginate: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    SubmittedCell: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.color,
    },
    CancelledCell: {
        backgroundColor: "#838587",
        color: theme.palette.common.black,
    },
    PendingCell: {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.common.black,
    },
    ShippingCell: {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.common.black,
    },
    DoneCell: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.black,
    },
    TableBorder: {
        border: "0.5px solid #13131321",
        textAlign: "center",
    },
}));
