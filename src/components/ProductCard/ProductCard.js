import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    makeStyles,
    Typography,
} from "@material-ui/core";
import "./ProductCard.scss";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: "300px",
        paddingTop: "56.25%", // 16:9
        marginTop: "30",
    },
}));

function ProductCard({ image, name, price, onClick }) {
    return (
        <Card className="card" onClick={onClick}>
            <CardActionArea>
                <CardHeader className="card__header" title="Out of Stock" />
                <CardMedia
                    className="card__image"
                    image={image}
                    title="Sneaker"
                />
                <CardContent>
                    <Typography
                        className="card__title"
                        align="center"
                        variant="h6"
                        gutterBottom>
                        {name}
                    </Typography>
                    <Typography
                        className="card__price"
                        align="center"
                        variant="subtitle1"
                        gutterBottom>
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductCard;
