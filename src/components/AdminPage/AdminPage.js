import React from "react";
import "./AdminPage.scss";
import AdminAppBar from "./AdminAppBar";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FormContainer } from "./AdminFormFields/FormContainer";
import { Form } from "./AdminFormFields/Form";
import { Input } from "./AdminFormFields/Input";
import { PrimaryButton } from "./AdminFormFields/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addAdminProduct } from "../../actions/admin-products";
import * as yup from "yup";
import { FormHeader } from "./AdminFormFields/FormHeader";

const schema = yup.object().shape({
    productName: yup
        .string()
        .required()
        .max(100, "Product Name must less than 100 characters"),
    productPrice: yup
        .number()
        .required()
        .positive("Product Price must be positive number"),
});

function AdminPage() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const formValues = useSelector((state) => state.adminProduct);

    const { register, control, handleSubmit, errors } = useForm({
        defaultValues: {
            productName: "",
            productPrice: null,
            sizes: [{ size: "", quantity: "" }],
            file: [{}],
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {
        fields: sizeFields,
        append: sizeAppend,
        remove: sizeRemove,
    } = useFieldArray({
        control,
        name: "sizes",
    });

    const {
        fields: fileFields,
        append: fileAppend,
        remove: fileRemove,
    } = useFieldArray({
        control,
        name: "file",
    });

    const onSubmit = (data) => {
        console.log(data);
        // const action = addAdminProduct(data);
        // dispatch(action);
    };

    const handleOnClickAddSizes = () => {
        sizeAppend({
            size: "",
            quantity: "",
        });
    };
    const handleOnClickAddFile = () => {
        fileAppend({});
    };
    return (
        <div>
            <AdminAppBar />
            <FormContainer>
                <FormHeader>Add Products</FormHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Product Title */}
                    <Input
                        name="productName"
                        type="text"
                        ref={register}
                        placeholder="Product Name"
                        label="Product Name"
                        error={!!errors.productName}
                        helperText={errors?.productName?.message}
                    />

                    {/* Product Price */}
                    <Input
                        name="productPrice"
                        type="number"
                        ref={register}
                        placeholder="Product Price"
                        label="Product Price"
                        error={!!errors.productPrice}
                        helperText={errors?.productPrice?.message}
                    />

                    {/* Product Sizes & Quantity for each sizes */}
                    <div className={styles.buttonAddWrapper}>
                        <PrimaryButton
                            color="primary"
                            className={styles.buttonAdd}
                            onClick={handleOnClickAddSizes}>
                            Add Size/Quantity
                        </PrimaryButton>
                    </div>
                    {sizeFields.map((item, index) => {
                        return (
                            <div className={styles.wrapper} key={item.id}>
                                <Input
                                    name={`sizes[${index}].size`}
                                    defaultValue={`${item?.size}`}
                                    ref={register()}
                                    label="Size"
                                />

                                <Input
                                    name={`sizes[${index}].quantity`}
                                    defaultValue={item?.quantity}
                                    ref={register()}
                                    label="Quantity"
                                />
                                <Button
                                    type="button"
                                    className={styles.buttonDelete}
                                    onClick={() => sizeRemove(index)}>
                                    X
                                </Button>
                            </div>
                        );
                    })}
                    {/* Upload Button */}
                    <div className={styles.buttonAddWrapper}>
                        <PrimaryButton
                            color="primary"
                            className={styles.buttonAdd}
                            onClick={handleOnClickAddFile}>
                            Add Image
                        </PrimaryButton>
                    </div>

                    {fileFields.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <input
                                    ref={register()}
                                    required
                                    type="file"
                                    name={`files[${index}]`}
                                    defaultValue={item?.file}
                                />
                            </div>
                        );
                    })}
                    {/* Clear Values Button */}

                    {/* Submit Button */}
                    <PrimaryButton color="secondary" type="submit">
                        Submit
                    </PrimaryButton>
                    {/* </form> */}
                </Form>
            </FormContainer>
        </div>
    );
}

export default AdminPage;

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    root: {
        width: "48%",
    },
    buttonDelete: {
        height: "80%",
        padding: "5px 10px",
    },
    buttonAdd: {
        width: "50%",
    },
    buttonAddWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(1),
    },
}));
