import React, { useState, useEffect } from "react";
import "./Products.scss";
import {
    FormControl,
    InputLabel,
    NativeSelect,
    Button,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Container,
    Grid,
} from "@material-ui/core";
import ProductCard from "../ProductCard/ProductCard";
import { withRouter } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

function Products({ history }) {
    const [anchorElFilter, setAnchorElFilter] = useState(null);
    const [filterProducts, setFilterProducts] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const [allProductItems, setAllProductItems] = useState([]);

    const handleOnChangeFilter = (event) => {
        setFilterProducts(event.target.value);
    };

    const handleOnClickProduct = (name) => {
        history.push(`/product/${name}`);
    };

    useEffect(() => {
        axiosClient
            .get("/product")
            .then((res) => {
                console.log(res);
                setAllProductItems(res);
            })
            .catch(() => alert("Can not fetch data"));
    }, []);
    return (
        <div className="product">
            {/* Header */}
            <div className="product__header">
                <div className="product__header--title">Products (Count)</div>

                <div className="product__header--filter">
                    {!isMobile ? (
                        <FormControl className="product__header--formcontrol">
                            <InputLabel htmlFor="uncontrolled-native">
                                Sort By
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: "name",
                                    id: "uncontrolled-native",
                                }}
                                onChange={handleOnChangeFilter}>
                                <option value={"newest"}>Newest</option>
                                <option value={"lastest"}>Lastest</option>
                                <option value={"desc"}>Price: High-Low</option>
                                <option value={"asc"}>Price: Low - High</option>
                            </NativeSelect>
                        </FormControl>
                    ) : (
                        <>
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={(event) => {
                                    setAnchorElFilter(event.currentTarget);
                                }}>
                                {!filterProducts
                                    ? "Sort By"
                                    : `${filterProducts}`}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorElFilter}
                                keepMounted
                                open={Boolean(anchorElFilter)}
                                onClose={() => {
                                    setAnchorElFilter(null);
                                }}>
                                <MenuItem
                                    onClick={() => {
                                        setAnchorElFilter(null);
                                        setFilterProducts("newest");
                                    }}>
                                    Newest
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setAnchorElFilter(null);
                                        setFilterProducts("lastest");
                                    }}>
                                    Lastest
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setAnchorElFilter(null);
                                        setFilterProducts("desc");
                                    }}>
                                    Price: High-Low
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setAnchorElFilter(null);
                                        setFilterProducts("asc");
                                    }}>
                                    Price: Low - High
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </div>
            </div>

            {/* Content */}
            {allProductItems ? (
                <div className="product__content">
                    <Container maxWidth="xl">
                        <Grid container spacing={6}>
                            {allProductItems.map((item, index) => {
                                const {
                                    _id,
                                    name,
                                    price,
                                    mainImage,
                                    sizes,
                                } = item;
                                return (
                                    <Grid
                                        key={index}
                                        item
                                        xs={12}
                                        sm={6}
                                        md={3}
                                        lg={2}>
                                        <ProductCard
                                            name={name}
                                            price={price}
                                            image={`${process.env.REACT_APP_API_URL}${mainImage}`}
                                            sizes={sizes}
                                            onClick={() => {
                                                handleOnClickProduct(_id);
                                            }}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Container>
                </div>
            ) : (
                "Loading..."
            )}

            {/* Footer */}
            <div className="product__footer">Footer</div>
        </div>
    );
}

export default withRouter(Products);
