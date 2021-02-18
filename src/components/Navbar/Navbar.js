import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useDispatch, useSelector } from "react-redux";
import {
    NavbarDrawerCart,
    NavbarDrawerSearchBar,
} from "../NavbarDrawer/NavbarDrawer";
import { removeItemFromCart } from "../../actions/cart";
import {
    AppBar,
    Toolbar,
    IconButton,
    MenuItem,
    Menu,
    Button,
    SwipeableDrawer,
} from "@material-ui/core";
// Customize of Material UI AppBar

const buttonMenu = [
    { title: "Product", url: "/product" },
    { title: "About", url: "/about" },
];

const Navbar = ({ location, history }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [currentDrawerClick, setCurrentDrawerClick] = useState(null);
    const itemList = useSelector((state) => state.cart.list);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ [anchor]: open });
    };
    const handleRemoveItemFromCart = (item) => {
        const action = removeItemFromCart(item);
        dispatch(action);
    };
    const renderDrawerByCurrentDrawerState = () => {
        if (currentDrawerClick === "search") {
            return <NavbarDrawerSearchBar />;
        } else if (currentDrawerClick === "cart") {
            return (
                <NavbarDrawerCart
                    itemList={processReduceCartItems(itemList)}
                    onClickRemoveItemFromCart={handleRemoveItemFromCart}
                />
            );
        }
        return;
    };
    const processReduceCartItems = (itemList) => {
        return itemList.reduce((acc, item) => {
            let found = false;

            for (let i = 0; i < acc.length; i++) {
                if (acc[i].name === item.name) {
                    found = true;
                    acc[i].count++;
                }
            }

            if (!found) {
                item.count = 1;
                acc.push(item);
            }
            return acc;
        }, []);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuIcon = (path) => {
        history.push(path);
        setAnchorEl(null);
    };
    const handleOnClickSearch = () => {
        setCurrentDrawerClick("search");
        toggleDrawer("right", true)();
    };
    const handleOnClickCart = () => {
        setCurrentDrawerClick("cart");
        toggleDrawer("right", true)();
    };
    return (
        <>
            <div className="navbar">
                <AppBar className="navbar__appbar" position="static">
                    <Toolbar>
                        <Button
                            className="navbar__title--button"
                            onClick={() => handleMenuIcon("/")}>
                            Shopping Cart
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
                                        <MenuItem
                                            onClick={() =>
                                                handleMenuIcon("/product")
                                            }>
                                            Products
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                handleMenuIcon("/about")
                                            }>
                                            About
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    {buttonMenu.map((item, id) => {
                                        const { title, url } = item;
                                        return (
                                            <Button
                                                onClick={() =>
                                                    handleMenuIcon(url)
                                                }
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
                        <div className="menu__icons">
                            <IconButton
                                color="primary"
                                onClick={handleOnClickSearch}>
                                <SearchIcon />
                            </IconButton>

                            <Badge
                                badgeContent={itemList.length}
                                color="secondary"
                                onClick={handleOnClickCart}>
                                <ShoppingCartIcon />
                            </Badge>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <SwipeableDrawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}>
                {currentDrawerClick === "search"
                    ? renderDrawerByCurrentDrawerState()
                    : currentDrawerClick === "cart"
                    ? renderDrawerByCurrentDrawerState()
                    : ""}
            </SwipeableDrawer>
        </>
    );
};
export default withRouter(Navbar);
