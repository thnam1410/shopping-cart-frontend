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

function ProductCard({ image, name, price, onClick, sizes }) {
    return (
        <Card className="card" onClick={onClick}>
            <CardActionArea>
                <CardHeader
                    className="card__header"
                    title={
                        sizes.every(({ quantity }) => parseInt(quantity) === 0)
                            ? "Out Of Stock"
                            : ""
                    }
                />
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
                        {price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductCard;
