import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        paddingTop: theme.spacing(5),
        fontWeight: "700",
        fontSize: "20px",
    },
}));

export const FormTitle = ({ children, ...props }) => {
    const styles = useStyles();
    return (
        <Typography className={styles.root} {...props}>
            {children}
        </Typography>
    );
};
