import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "./AdminFormFields/Form";
import { FormContainer } from "./AdminFormFields/FormContainer";
import { FormTitle } from "./AdminFormFields/FormTitle";
import { Input } from "./AdminFormFields/Input";
import { PrimaryButton } from "./AdminFormFields/PrimaryButton";

function ProductDetailsDialog({ open, handleClose, product, onExited }) {
    const { register, control, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: product.name,
            sizes: [],
        },
    });
    const classes = useStyles();
    const {
        fields: sizeFields,
        append: sizeAppend,
        remove: sizeRemove,
    } = useFieldArray({
        control,
        name: "sizes",
    });
    useEffect(() => {
        setValue("sizes", product.sizes);
    }, [setValue, product]);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            onExited={() => onExited(null)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
                <Typography color="secondary">Product Details</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {/* Product Name */}
                <FormContainer>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* Product Price */}
                        <Input
                            name="name"
                            type="text"
                            ref={register}
                            placeholder="Product Name"
                            label="Product Name"
                            defaultValue={product.name}
                        />
                        {/* Product Size & Quantity*/}
                        <FormTitle style={{ paddingTop: "5px" }}>
                            Sizes
                        </FormTitle>
                        <div>
                            {/* {product.sizes.map(({ size, quantity }, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={classes.sizeContent}>
                                        <Input
                                            name={`sizes[${index}].size`}
                                            defaultValue={`${size}`}
                                            ref={register()}
                                            label="Size"
                                            style={{ width: "40%" }}
                                        />

                                        <Input
                                            name={`sizes[${index}].quantity`}
                                            defaultValue={quantity}
                                            ref={register()}
                                            label="Quantity"
                                            style={{ width: "40%" }}
                                        />
                                        <button
                                            type="button"
                                            className={classes.buttonDeleteSize}
                                            onClick={() => sizeRemove(index)}>
                                            X
                                        </button>
                                    </div>
                                );
                            })} */}
                            {sizeFields.map(({ size, quantity }, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={classes.sizeContent}>
                                        <Input
                                            name={`sizes[${index}].size`}
                                            defaultValue={`${size}`}
                                            ref={register()}
                                            label="Size"
                                            style={{ width: "40%" }}
                                        />

                                        <Input
                                            name={`sizes[${index}].quantity`}
                                            defaultValue={quantity}
                                            ref={register()}
                                            label="Quantity"
                                            style={{ width: "40%" }}
                                        />
                                        <button
                                            type="button"
                                            className={classes.buttonDeleteSize}
                                            onClick={() => sizeRemove(index)}>
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Main Image */}

                        {/* Sub Images */}

                        {/* Category */}

                        {/*  */}
                        {/* Button Add Size & Quantity */}
                        {/* Button Add Main Image */}
                        {/* Button Add Sub Images */}
                        {/* Button Save Changes */}
                        <PrimaryButton
                            color="primary"
                            onClick={() =>
                                sizeAppend({
                                    size: "",
                                    quantity: "",
                                })
                            }>
                            Add Size/Quantity
                        </PrimaryButton>
                        <PrimaryButton color="secondary" type="submit">
                            Submit
                        </PrimaryButton>
                    </Form>
                </FormContainer>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;

const useStyles = makeStyles((theme) => ({
    sizeContent: {
        position: "relative",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonDeleteSize: {
        position: "absolute",
        top: "50%",
        right: "0",
        transform: "translate(50%, -50%)",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
        background: "none",
        border: "none",
    },
}));
