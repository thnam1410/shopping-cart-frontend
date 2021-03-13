import { makeStyles, TextField } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./scss/input.scss";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
}));

export const Input = forwardRef((props, ref) => {
    const styles = useStyles();

    return (
        <TextField
            className={styles.root}
            variant="outlined"
            margin="normal"
            inputRef={ref}
            fullWidth
            {...props}
        />
    );
});
