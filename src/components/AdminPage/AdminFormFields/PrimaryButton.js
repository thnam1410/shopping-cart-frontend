import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

export const PrimaryButton = ({ children, ...props }) => {
    const styles = useStyles();

    return (
        <Button
            fullWidth
            variant="contained"
            className={styles.root}
            {...props}>
            {children}
        </Button>
    );
};
