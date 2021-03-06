import React, { useState, useEffect } from "react";
import "./ProductItem.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import image from "../../static/img/img01.jpg";
import { Button, Typography } from "@material-ui/core";
import { useParams, withRouter } from "react-router-dom";
import { addNewItemToCart } from "../../actions/cart";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { processReduceCartItems } from "../Navbar/Navbar";
function ProductItem({ history }) {
    const [activeImage, setActiveImage] = useState(0);
    const [countItem, setCountItem] = useState(1);
    const [currentSizeChoose, setCurrentSizeChoose] = useState(0);
    const [currentMainImage, setCurrentMainImage] = useState(null);
    const [product, setProduct] = useState([]);
    const cart = useSelector((state) => state.cart.list);
    const routeParams = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const { productId } = routeParams;
        const fetchData = async () => {
            try {
                const data = await axiosClient
                    .get(`/product/${productId}`)
                    .catch((err) => {
                        throw err;
                    });
                setProduct(data);
                const sortSizes = data.sizes.sort((a, b) => a.size - b.size);
                const firstAvailableSizeIndex = sortSizes.findIndex(
                    (x) => x.quantity !== 0
                );
                console.log(firstAvailableSizeIndex);
                if (firstAvailableSizeIndex !== -1) {
                    setCurrentSizeChoose(
                        sortSizes[firstAvailableSizeIndex].size
                    );
                }
            } catch (e) {
                // alert("Can not found Product");
                console.log(e);
                history.push("/");
            }
        };
        fetchData();
    }, [routeParams]);

    const handleOnClickImg = (index, path) => {
        setActiveImage(index);
        setCurrentMainImage(`${process.env.REACT_APP_API_URL}${path}`);
    };
    const handleOnClickMinusCountItem = () => {
        if (countItem > 1) {
            setCountItem(countItem - 1);
        }
    };
    const handleOnClickPlusCountItem = () => {
        setCountItem(countItem + 1);
    };

    const handleOnClickSize = (size) => {
        setCurrentSizeChoose(size);
    };
    const checkOutOfStock = () => {
        const { sizes } = product;
        const findSizeStock = sizes.filter(
            (x) => x.size == currentSizeChoose
        )[0];
        let currentItemQuantity = cart
            .filter((x) => x.name === product.name)
            .reduce((total, { quantity }) => (total += quantity), 0);
        const stockLeft = parseInt(findSizeStock.quantity);
        if (!currentItemQuantity && countItem > stockLeft) {
            return true;
        }
        if (
            currentItemQuantity &&
            currentItemQuantity + countItem > stockLeft
        ) {
            return true;
        }
        return false;
    };
    const handleAddToCartItem = () => {
        if (checkOutOfStock()) {
            alert(
                "Your Quantiy Order is Out of Stock Range. Please change your number of order"
            );
            return;
        }
        const item = {
            name: product.name,
            price: product.price,
            size: currentSizeChoose,
            quantity: countItem,
            img: product.mainImage,
        };
        const action = addNewItemToCart(item);
        dispatch(action);
    };
    return Object.keys(product).length === 0 || product.length === 0 ? (
        <div>loading...</div>
    ) : (
        <>
            <Container maxWidth="xl" className="product">
                {/* Image Side */}
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="left-wrapper">
                            <div className="img-wrapper">
                                <img
                                    className="main-image"
                                    alt="productItem"
                                    src={
                                        currentMainImage ??
                                        `${process.env.REACT_APP_API_URL}${product.mainImage}`
                                    }
                                />
                            </div>
                            <div className="images-slide">
                                {product.subImages &&
                                    [
                                        ...product.subImages,
                                        product.mainImage,
                                    ].map((path, index) => (
                                        <img
                                            alt="Slide Images"
                                            key={index}
                                            className={
                                                "images-slide__img " +
                                                (index === activeImage
                                                    ? "images-slide__active"
                                                    : "")
                                            }
                                            src={`${process.env.REACT_APP_API_URL}${path}`}
                                            onClick={() =>
                                                handleOnClickImg(index, path)
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    </Grid>

                    {/* Product Infor Side */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="product__informationSide">
                            <Typography className="product__title" variant="h4">
                                {product.name}
                            </Typography>
                            <Typography className="product__price" variant="h5">
                                {product.price.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </Typography>
                            <div className="product__size">
                                {product.sizes !== 0
                                    ? product.sizes
                                          .sort((a, b) => a.size - b.size)
                                          .map(({ size, quantity }, index) => (
                                              <Button
                                                  variant="contained"
                                                  key={index}
                                                  onClick={() => {
                                                      handleOnClickSize(size);
                                                  }}
                                                  style={
                                                      size === currentSizeChoose
                                                          ? {
                                                                backgroundColor:
                                                                    "#000",
                                                                color: "#fff",
                                                            }
                                                          : {
                                                                backgroundColor:
                                                                    "#fff",
                                                                color: "#000",
                                                            }
                                                  }
                                                  disabled={
                                                      parseInt(quantity) === 0
                                                          ? true
                                                          : false
                                                  }>
                                                  {size}
                                              </Button>
                                          ))
                                    : ""}
                            </div>
                            <div className="product__counter">
                                <Button
                                    variant="contained"
                                    onClick={handleOnClickMinusCountItem}
                                    disabled={countItem === 1 ? true : false}
                                    style={
                                        countItem === 1
                                            ? {
                                                  backgroundColor:
                                                      "rgba(0,0,0,0.44)",
                                                  color: "#fff",
                                              }
                                            : {
                                                  backgroundColor: "#000",
                                                  color: "#fff",
                                              }
                                    }>
                                    -
                                </Button>
                                <div className="product__counter-value">
                                    {countItem}
                                </div>
                                <Button
                                    variant="contained"
                                    onClick={handleOnClickPlusCountItem}
                                    style={{
                                        backgroundColor: "#000",
                                        color: "#fff",
                                    }}>
                                    +
                                </Button>
                            </div>
                            <Button
                                className="btn__addtocart"
                                onClick={() => {
                                    handleAddToCartItem();
                                }}>
                                Add To Cart
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default withRouter(ProductItem);
