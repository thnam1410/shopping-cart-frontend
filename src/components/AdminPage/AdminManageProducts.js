import {
    Divider,
    IconButton,
    InputBase,
    makeStyles,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SearchBar from "material-ui-search-bar";
import axiosClient from "../../api/axiosClient";

import React, { useRef, useState } from "react";
import ProductDetailsDialog from "./ProductDetailsDialog";

const tableProductColumn = [
    { id: "productNo", label: "No.", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    {
        id: "price",
        label: "Price",
        minWidth: 100,
        format: (value) =>
            value.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
            }),
    },
    { id: "sizes", label: "Sizes", minWidth: 100 },
    { id: "sold", label: "Sold", minWidth: 50 },
    { id: "category", label: "Category", minWidth: 100 },
];
function AdminManageProducts() {
    // Component variables
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState("");

    const [filterCategory, setFilterCategory] = useState("All");
    const [allCategoryName, setAllCategoryName] = useState([]);

    const [allProducts, setAllProducts] = useState([]);
    const [originalFetchedProducts, setOriginalFetchedProducts] = useState([]);
    const [currentChooseProduct, setCurrentChooseProduct] = useState(null);

    const allProductsOriginalRef = useRef();
    const allProductsRef = useRef();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const indexColumnArray = Array.from(
        { length: rowsPerPage },
        (_, i) => i + (page + 1) * rowsPerPage - rowsPerPage + 1
    );

    // Dialog variables
    const [openDialog, setOpenDialog] = useState(false);

    useState(() => {
        axiosClient
            .get("/product/category_name")
            .then((res) => setAllCategoryName(res))
            .catch((err) => {
                console.log(err);
                alert("Can not connect to server...!");
            });
        axiosClient
            .get("/product")
            .then((res) => {
                const reFormatResponse = res.map((item) => {
                    const { _id, name, price, sizes, sold, category } = item;
                    return {
                        _id,
                        name,
                        price,
                        sizes,
                        sold,
                        category,
                    };
                });
                allProductsRef.current = reFormatResponse;
                allProductsOriginalRef.current = reFormatResponse;
                setAllProducts(reFormatResponse);
                setOriginalFetchedProducts(res);
            })
            .catch(() => alert("Can not fetch data"));
    }, []);

    // SearchBar Change
    const handleOnChangeSearch = (value) => {
        if (value === "") {
            setAllProducts(allProductsRef.current);
            return;
        }
        setSearchValue(value);
        const searchFilterProducts = allProductsRef.current.filter(({ name }) =>
            name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setAllProducts(searchFilterProducts);
    };

    // Enter Search Bar
    const handleRequestSearch = (value) => {
        const searchFilterProducts = allProductsRef.current.filter(({ name }) =>
            name.toLowerCase().includes(value.toLowerCase())
        );
        setAllProducts(searchFilterProducts);
    };

    // Filter Category Change
    const handleChangeFilter = (e) => {
        const filterCategory = e.target.value;
        setFilterCategory(filterCategory);
        setSearchValue("");
        if (filterCategory === "All") {
            setAllProducts(allProductsOriginalRef.current);
            allProductsRef.current = allProductsOriginalRef.current;
            return;
        }
        const filterProducts = allProductsOriginalRef.current.filter(
            ({ category }) => category.includes(filterCategory)
        );
        allProductsRef.current = filterProducts;
        setAllProducts(filterProducts);
    };

    // Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // RenderRow
    const renderSizesInARow = (sizes) => {
        return sizes.map((e, index) => {
            const { size, quantity } = e;
            return (
                <div key={index}>
                    <div className={classes.sizeCell}>
                        <div className={classes.size}>Size: {size}</div>
                        <div className={classes.quantity}>
                            Quantity: {quantity}
                        </div>
                    </div>
                    <Divider key={`divider-${index}`} />
                </div>
            );
        });
    };
    const handleOnClickRowProduct = (id) => {
        const currentOnClickProduct = originalFetchedProducts.filter(
            (x) => x._id === id
        )[0];
        setCurrentChooseProduct(currentOnClickProduct);
        setOpenDialog(true);
    };
    return (
        <div>
            <Paper className={classes.root}>
                {/* Search Bar */}
                <div className={classes.flexCenter}>
                    <SearchBar
                        className={classes.searchBar}
                        value={searchValue}
                        onChange={(value) => handleOnChangeSearch(value)}
                        onRequestSearch={() => handleRequestSearch(searchValue)}
                        onCancelSearch={() => setSearchValue("")}
                    />
                    <TextField
                        select
                        className={classes.filterBar}
                        label="Filter"
                        variant="outlined"
                        margin="normal"
                        onChange={handleChangeFilter}
                        value={filterCategory}>
                        <MenuItem value="All">Category</MenuItem>
                        {/* Fetch Category Here */}
                        {allCategoryName?.map((cate, index) => (
                            <MenuItem key={index} value={cate}>
                                {cate}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                {/* Data Table Component */}
                <div>
                    <Paper className={classes.root}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={allProducts?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {tableProductColumn.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="center"
                                                style={{
                                                    minWidth: column.minWidth,
                                                    textAlign: "center",
                                                }}
                                                className={
                                                    classes.headerTableCell
                                                }>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allProducts &&
                                        allProducts
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row, index) => {
                                                row["productNo"] =
                                                    indexColumnArray[index];

                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row._id}
                                                        className={
                                                            classes.tableRow
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleOnClickRowProduct(
                                                                row._id
                                                            )
                                                        }>
                                                        {tableProductColumn.map(
                                                            (column) => {
                                                                const value =
                                                                    row[
                                                                        column
                                                                            .id
                                                                    ];
                                                                return (
                                                                    <TableCell
                                                                        key={
                                                                            column.id
                                                                        }
                                                                        align={
                                                                            column.align
                                                                        }
                                                                        className={
                                                                            classes.rowCell
                                                                        }>
                                                                        {column.id !==
                                                                        "sizes"
                                                                            ? column.format
                                                                                ? column.format(
                                                                                      value
                                                                                  )
                                                                                : value
                                                                            : renderSizesInARow(
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
                </div>
            </Paper>
            {/* Dialog */}
            {currentChooseProduct && (
                <ProductDetailsDialog
                    open={openDialog}
                    handleClose={() => setOpenDialog(false)}
                    product={currentChooseProduct}
                    onExited={setCurrentChooseProduct}
                />
            )}
        </div>
    );
}

export default AdminManageProducts;
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "50px",
    },
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchBar: {
        width: "25%",
        minWidth: "200px",
        height: "100%",
        background: "#e5e5e578",
        margin: "auto 20px",
    },
    filterBar: {
        background: "#e5e5e578",
        width: "15%",
        minWidth: " 150px",
    },
    headerTableCell: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        border: "1px solid #494949",
    },
    sizeCell: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px",
    },
    rowCell: {
        border: "0.5px solid #13131321",
        textAlign: "center",
        maxWidth: "200px",
    },
}));
