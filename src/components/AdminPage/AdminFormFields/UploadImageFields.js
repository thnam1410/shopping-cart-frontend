import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";

const useStyles = makeStyles((theme) => ({
    buttonAddWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(1),
    },
    buttonInputFile: {
        padding: theme.spacing(2),
    },
    fileItem: {
        overflow: "hidden",
    },
    largeAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

export const UploadImageFields = ({ id, onChange, images, buttonName }) => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.buttonAddWrapper}>
                <label htmlFor={id}>
                    <input
                        className={styles.buttonInputFile}
                        required
                        id={id}
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(e) => {
                            onChange(e, id);
                        }}
                        hidden
                        multiple
                    />

                    <Button
                        color="secondary"
                        variant="contained"
                        component="span">
                        {buttonName}
                    </Button>
                </label>
            </div>
            <div>
                <List>
                    {images?.map((obj, index) => {
                        const { src, file } = obj;
                        return (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar
                                        className={styles.largeAvatar}
                                        src={src}>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    className={styles.fileItem}
                                    primary={file.name}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </>
    );
};
