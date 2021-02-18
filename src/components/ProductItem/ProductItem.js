import React, { useState, useEffect } from "react";
import "./ProductItem.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import image from "../../static/img/img01.jpg";
import { Button, Typography } from "@material-ui/core";
import { useParams, withRouter } from "react-router-dom";
import { fakeListItem } from "../../data";

function ProductItem({ location }) {
    const [activeImage, setActiveImage] = useState(0);
    const [countItem, setCountItem] = useState(1);
    const [currentSizeChoose, setCurrentSizeChoose] = useState(0);
    const [product, setProduct] = useState();
    const routeParams = useParams();

    useEffect(() => {
        // const path = location.pathname;
        // const _product = path.match(new RegExp("/product/([^/]+)"))[1];
        const data = fakeListItem.filter(
            (x) => x.id == routeParams.productId
        )[0];
        setProduct(data);
    }, []);

    const handleOnClickImg = (index) => {
        setActiveImage(index);
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

    // console.log(typeof product.sizes);
    // console.log(product.sizes);
    console.log(routeParams);

    if (!product) {
        
    }
    return product ? (
        <>
            <Container maxWidth="xl" className="product">
                {/* Image Side */}
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <img
                            className="main-image"
                            alt="productItem"
                            src={image}
                        />
                        <div className="images-slide">
                            {[image, image, image].map((img, index) => (
                                <img
                                    alt="Slide Images"
                                    key={index}
                                    className={
                                        "images-slide__img " +
                                        (index === activeImage
                                            ? "images-slide__active"
                                            : "")
                                    }
                                    src={img}
                                    onClick={() => handleOnClickImg(index)}
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
                                {
                                    // console.log(typeof product.sizes)
                                    // product.size.map((item, index) => (
                                    //     <Button
                                    //         variant="contained"
                                    //         key={index}
                                    //         onClick={() => {
                                    //             handleOnClickSize(index);
                                    //         }}
                                    //         style={
                                    //             index === currentSizeChoose
                                    //                 ? {
                                    //                       backgroundColor:
                                    //                           "#000",
                                    //                       color: "#fff",
                                    //                   }
                                    //                 : {
                                    //                       backgroundColor:
                                    //                           "#fff",
                                    //                       color: "#000",
                                    //                   }
                                    //         }>
                                    //         {item}
                                    //     </Button>
                                    // ))
                                }
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
                            <Button className="btn__addtocart">
                                Add To Cart
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    ) : (
        <div> Loadiing</div>
    );
}

export default withRouter(ProductItem);
