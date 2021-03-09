import React, { useEffect, useState } from "react";
import AdminAppBar from "./AdminAppBar";
import {
    Avatar,
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FormContainer } from "./AdminFormFields/FormContainer";
import { Form } from "./AdminFormFields/Form";
import { Input } from "./AdminFormFields/Input";
import { PrimaryButton } from "./AdminFormFields/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addAdminProduct } from "../../actions/admin-products";
import * as yup from "yup";
import { FormTitle } from "./AdminFormFields/FormTitle";
import FolderIcon from "@material-ui/icons/Folder";
import { withRouter } from "react-router-dom";
import { UploadImageFields } from "./AdminFormFields/UploadImageFields";
import axiosClient from "../../api/axiosClient";

const schema = yup.object().shape({
    productName: yup
        .string()
        .required()
        .max(100, "Product Name must less than 100 characters"),
    productPrice: yup
        .number()
        .required()
        .positive("Product Price must be positive number"),
    category: yup.string().required(),
    tags: yup.string().required(),
});

function AdminPage({ history }) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [mainImages, setMainImages] = useState([]);
    const [subImages, setSubImages] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const { register, control, handleSubmit, errors } = useForm({
        defaultValues: {
            productName: "",
            productPrice: null,
            category: "",
            tags: "",
            sizes: [{ size: "", quantity: "" }],
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

    useEffect(() => {
        axiosClient
            .get("/product/category_name")
            .then((res) => {
                setCategoryList(res);
            })
            .catch((err) => {
                console.log("Can not get category data");
            });
    }, []);

    const onSubmit = (data) => {
        if (mainImages.length === 0) {
            alert("You need to upload main images");
            return;
        }
        if (!data.sizes) {
            alert("You need to add size for the product");
            return;
        }
        //Data show after post
        const showData = {
            ...data,
            category: data.category.split(","),
            tags: data.tags.split(","),
            mainImage: mainImages[0],
            subImages: [...subImages],
        };

        //Data post to server
        const uploadData = {
            name: data.productName,
            price: data.productPrice,
            sizes: JSON.stringify(data.sizes),
            category: data.category.split(","),
            tags: data.tags
                .replace(/\s+/g, "")
                .split(",")
                .map((x) => {
                    const result = x.toLowerCase();
                    return result.charAt(0).toUpperCase() + result.slice(1);
                })
                .filter((x) => x !== ""),
            mainImage: mainImages[0]?.file,
            subImages: [...subImages].map((obj) => obj.file),
        };
        console.log(uploadData);
        const formData = Object.keys(uploadData).reduce((formData, key) => {
            // Convert all array value into form data format
            if (Array.isArray(uploadData[key])) {
                uploadData[key].forEach((element) => {
                    formData.append(`${key}[]`, element);
                });
                return formData;
            }
            formData.append(key, uploadData[key]);
            return formData;
        }, new FormData());

        axiosClient
            .post("/product/create", formData)
            .then((res) => {
                const action = addAdminProduct(showData);
                dispatch(action);

                history.push("/admin/product/review");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOnClickAddSizes = () => {
        sizeAppend({
            size: "",
            quantity: "",
        });
    };
    const handleOnChangeUploadImages = (e, id) => {
        if (id === "main") {
            const fileList = e.target.files;
            const arrFileList = [...fileList].map((file) => ({
                src: URL.createObjectURL(file),
                file: file,
            }));

            setMainImages(arrFileList.splice(0, 1));
        } else {
            const fileList = e.target.files;
            const arrFileList = [...fileList].map((file) => ({
                src: URL.createObjectURL(file),
                file: file,
            }));
            setSubImages(arrFileList);
        }
    };
    return (
        <div>
            <FormContainer>
                <FormTitle>Add Products</FormTitle>
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
                    {/* Category */}
                    <Input
                        name="category"
                        type="text"
                        ref={register}
                        placeholder="Product Category"
                        label="Product Category"
                        error={!!errors.category}
                        helperText={`Suggest: ${categoryList.join("/")}
                                            _ Rule: Each Category split by ","`}
                    />

                    {/* Tags */}
                    <Input
                        name="tags"
                        type="text"
                        ref={register}
                        placeholder="Product Tags"
                        label="Product Tags"
                        error={!!errors.tags}
                        helperText={errors?.tags?.message}
                    />
                    {/* Product Sizes & Quantity for each sizes */}
                    <FormTitle style={{ paddingTop: "20px" }}>Sizes</FormTitle>
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
                    <div className={styles.buttonAddWrapper}>
                        <PrimaryButton
                            color="primary"
                            className={styles.buttonAdd}
                            onClick={handleOnClickAddSizes}>
                            Add Size/Quantity
                        </PrimaryButton>
                    </div>
                    {/* Upload Button */}

                    {/* Main Images */}
                    <FormTitle style={{ paddingTop: "20px" }}>
                        Main Image ( Max: 1)
                    </FormTitle>

                    <UploadImageFields
                        id="main"
                        onChange={handleOnChangeUploadImages}
                        images={mainImages}
                        buttonName="Upload Main Image"
                    />

                    {/* Sub Images */}
                    <FormTitle style={{ paddingTop: "20px" }}>
                        Sub Images ( Max: 4)
                    </FormTitle>
                    <UploadImageFields
                        id="sub"
                        onChange={handleOnChangeUploadImages}
                        images={subImages}
                        buttonName="Upload Sub Images"
                    />

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

export default withRouter(AdminPage);

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
    buttonInputFileWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonInputFile: {
        padding: theme.spacing(2),
    },
    fileItem: {
        overflow: "hidden",
    },
}));
