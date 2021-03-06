import cartReducer from "./cart";
import adminProductReducer from "./admin-products";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    cart: cartReducer,
    adminProduct: adminProductReducer,
});

export default rootReducer;
