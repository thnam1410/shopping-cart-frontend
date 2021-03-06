import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    MenuItem,
    Menu,
    Button,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const buttonMenu = [{ title: "Add Products", url: "/admin/product" }];

const AdminAppBar = ({ history, location }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuIcon = (path) => {
        history.push(path);
        setAnchorEl(null);
    };
    return location.pathname.startsWith("/admin") ? (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        <Typography
                            variant="h6"
                            className={classes.title}
                            onClick={() => {
                                history.push("/admin");
                            }}>
                            Admin Page
                        </Typography>
                    </Button>
                    <div className="navbar__content">
                        {isMobile ? (
                            <>
                                <IconButton
                                    edge="start"
                                    className="menu__button"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleMenu}>
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}>
                                    {buttonMenu.map((item, id) => {
                                        const { title, url } = item;
                                        return (
                                            <MenuItem
                                                onClick={() =>
                                                    handleMenuIcon(`${url}`)
                                                }>
                                                {title}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </>
                        ) : (
                            <>
                                {buttonMenu.map((item, id) => {
                                    const { title, url } = item;
                                    return (
                                        <Button
                                            onClick={() => handleMenuIcon(url)}
                                            className="menu__item"
                                            key={id}>
                                            <span className="menu__item--buttontext">
                                                {title}
                                            </span>
                                        </Button>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    ) : null;
};
export default withRouter(AdminAppBar);
