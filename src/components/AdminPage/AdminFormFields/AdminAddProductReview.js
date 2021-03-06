import { Avatar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import HeightIcon from "@material-ui/icons/Height";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormContainer } from "./FormContainer";
import { PrimaryButton } from "./PrimaryButton";

const useStyles = makeStyles({
    root: {
        margin: "30px 0",
    },
    title: {
        paddingTop: "50px",
    },
    listItem: {
        overflow: "hidden",
    },
});
export const AdminAddProductReview = withRouter(({ history }) => {
    const styles = useStyles();
    const data = useSelector((state) => state.adminProduct);

    const filterFields = [
        "files",
        "sizes",
        "tags",
        "category",
        "mainImage",
        "subImages",
    ];
    const entries = Object.entries(data).filter(
        (entry) => !filterFields.includes(entry[0])
    );
    const { mainImage, subImages, category, tags, sizes } = data;
    return (
        <>
            <FormContainer>
                <Typography
                    className={styles.title}
                    component="h2"
                    variant="h5">
                    📋 Form Values
                </Typography>
                <TableContainer className={styles.root} component={Paper}>
                    <Table className={styles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Field</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entries.map((entry) => (
                                <TableRow key={entry[0]}>
                                    <TableCell component="th" scope="row">
                                        {entry[0]}
                                    </TableCell>
                                    <TableCell align="right">
                                        {entry[1].toString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {}
                        </TableBody>
                    </Table>
                </TableContainer>
                {category && (
                    <>
                        <Typography component="h2" variant="h5">
                            📦 Category
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CategoryRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`Category: ${category.map(
                                        (cate) => cate
                                    )}`}
                                />
                            </ListItem>
                        </List>
                    </>
                )}
                {tags && (
                    <>
                        <Typography component="h2" variant="h5">
                            📦 Tags
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocalOfferRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`Tags: ${tags.map((tag) => tag)}`}
                                />
                            </ListItem>
                        </List>
                    </>
                )}
                {sizes && (
                    <>
                        <Typography component="h2" variant="h5">
                            📦 Sizes
                        </Typography>
                        <List>
                            {sizes.map((size, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <HeightIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Size: ${size.size}`}
                                        secondary={`Quantity: ${size.quantity}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                {mainImage.file && (
                    <>
                        <Typography component="h2" variant="h5">
                            📦 Main Image
                        </Typography>
                        <List className={styles.listItem}>
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar src={mainImage.src} />
                                </ListItemIcon>
                                <ListItemText
                                    className={styles.listItem}
                                    primary={`File Name: ${mainImage.file.name}`}
                                    secondary={`File Size: ${Math.floor(
                                        mainImage.file.size / 1024
                                    )}KB`}
                                />
                            </ListItem>
                        </List>
                    </>
                )}
                {subImages && (
                    <>
                        <Typography component="h2" variant="h5">
                            📦 Sub Images
                        </Typography>
                        <List className={styles.listItem}>
                            {subImages.map((obj, index) => {
                                const { src, file } = obj;
                                return (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <Avatar src={src} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`File Name: ${file.name}`}
                                            secondary={`File Size: ${Math.floor(
                                                file.size / 1024
                                            )}KB`}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>
                )}
                <PrimaryButton
                    color="secondary"
                    onClick={() => {
                        history.push("/admin");
                    }}>
                    Back To Homepage
                </PrimaryButton>
            </FormContainer>
        </>
    );
});
