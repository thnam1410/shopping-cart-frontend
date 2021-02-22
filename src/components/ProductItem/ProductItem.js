import React, { useState, useEffect } from "react";
import "./ProductItem.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import image from "../../static/img/img01.jpg";
import { Button, Typography } from "@material-ui/core";
import { useParams, withRouter } from "react-router-dom";
import { addNewItemToCart } from "../../actions/cart";
import { useDispatch } from "react-redux";
import axiosClient from "../../api/axiosClient";

function ProductItem({ location }) {
    const [activeImage, setActiveImage] = useState(0);
    const [countItem, setCountItem] = useState(1);
    const [currentSizeChoose, setCurrentSizeChoose] = useState(null);
    const [currentMainImage, setCurrentMainImage] = useState(null);
    const [product, setProduct] = useState([]);
    const routeParams = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("use effect");
        const { productId } = routeParams;
        axiosClient
            .get(`/product/${productId}`)
            .then((res) => {
                console.log(res);
                setProduct(res);
            })
            .catch((err) => console.log(err));
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

    const handleOnClickSize = (index) => {
        setCurrentSizeChoose(index);
    };

    const handleAddToCartItem = (item) => {
        const action = addNewItemToCart(item);
        dispatch(action);
    };
    return product.length !== 0 ? (
        <>
            <Container maxWidth="xl" className="product">
                {/* Image Side */}
                <Grid container>
                    <Grid container xs={12} sm={12} md={6} lg={6}>
                        <div className="main-image-wrapper">
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
                    </Grid>

                    {/* Product Infor Side */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="product__informationSide">
                            <Typography className="product__title" variant="h4">
                                {product.name}
                            </Typography>
                            <Typography className="product__price" variant="h5">
                                {product.price}
                            </Typography>
                            <div className="product__size">
                                {product.sizes.map(
                                    ({ size, quantity }, index) => (
                                        <Button
                                            variant="contained"
                                            key={index}
                                            onClick={() => {
                                                handleOnClickSize(index);
                                            }}
                                            style={
                                                index === currentSizeChoose
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
                                    )
                                )}
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
                                    handleAddToCartItem(product);
                                }}>
                                Add To Cart
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    ) : (
        <div>loading...</div>
    );
}

export default withRouter(ProductItem);
